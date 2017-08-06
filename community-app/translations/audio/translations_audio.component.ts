import { Component } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Subject } from "rxjs/Subject";

import { TranslationsMediaComponent } from "../translations_media.abstract.component";
import { List } from "../../common/list.interface";
import { TranslationService } from "../translation.service";
import { TranslationAudioService } from "./translation_audio.service";
import { Translation } from "../../common/translation";
import { TranslationAudio } from "../../common/translation_audio";
import { Project } from "../../common/project";
import { Language } from "../../common/language";
import { Logger } from "../../common/logger";
import { FileUploadService } from "../../common/file_upload.service";
import { Message } from "common/message";

const $ = require("jQuery");

@Component({
  selector: "translations-audio",
  templateUrl: "translations_audio.component.html",
  styleUrls: ["translations_audio.component.css"],
  providers: [TranslationService, TranslationAudioService, FileUploadService]
})
export /**
 * Translations Audio Component class
 * @class
 * @extends ListComponent
 * @implements List
 */
class TranslationsAudioComponent extends TranslationsMediaComponent
  implements List {
  /**
   * @property {Object} state_translations_audio_observer - state_translations_audio_observer
   */
  protected state_translations_audio_observer = {
    next: x => {
      switch (x) {
        case "load":
        case "load_fail":
          break;
        case "importOne":
          $("audio").each(function(i) {
            $("audio")[i].load();
          });
          break;
      }
    }
  };
  /**
   * @constructs UsersComponent
   * @param {TranslationService} service  
   * @param {ActivatedRoute} route
   * @returns {void}
   */
  constructor(
    protected service: TranslationAudioService,
    private translationService: TranslationService,
    private fileUploadService: FileUploadService,
    private route: ActivatedRoute
  ) {
    super();
    this.state_subject.subscribe(this.state_translations_media_observer);
    this.state_subject.subscribe(this.state_translations_audio_observer);
    this.state_subject.next("construct");
    this.upload_subject = new Subject();
    this.upload_subject.subscribe(this.upload_observer);
  }

  /**
   * Loads Component model
   * @param {number} [project_id] - Project ID
   * @param {number} [language_id] - Language ID
   * @returns {Promise<Translation[]>}
   */
  load(project_id?: number, language_id?: number): Promise<any> {
    if (typeof project_id == "undefined") project_id = this.project.id;
    if (typeof language_id == "undefined") language_id = this.language.id;

    let promise = this.translationService.getTranslations(
      project_id,
      language_id,
      this.pagination.page
    );
    this.state_subject.next("loading");
    promise
      .then(data => {
        if (data.length > 0) {
          this.language = data[0].language;
          this.project = data[0].project;

          for (let i in data) {
            let translation = new Translation();
            for (let j in data[i]) {
              if (j == "audio_stack")
                for (let k in data[i][j]) {
                  translation[j][k] = new TranslationAudio();
                  for (let l in data[i][j][k])
                    translation[j][k][l] = data[i][j][k][l];
                }
              else translation[j] = data[i][j];
            }
            this.data.push(translation);
          }
          Logger.log(this.data);
          this.state_subject.next("load");
        } else this.state_subject.next("load_empty");
      })
      .catch(err => {
        this.state_subject.next("load_failed");
      });
    return promise;
  }

  /**
   * Init Component
   * @returns {void}
   */
  onInit(): void {
    this.route.params
      .switchMap((params: Params) => this.load(+params["id1"], +params["id2"]))
      .subscribe(res => {
        this.state_subject.next("init");
      });

    this.fileUploadService.getStateObservable().subscribe(state => {
      console.log(state);
    });
    this.fileUploadService.getObservable().subscribe(progress => {
      this.upload_subject.next(
        Math.round(this.get_signed_url_rate + this.stage1_rate * progress)
      );
    });
  }

  /**
   * @param {Event} e - File Input change event
   * @returns {void}
   */
  importHandler(e: any): void {
    let result;
    let overwrite = true; //!confirm('Overwrite similar files?');
    if (this.state.indexOf("importing") == 0) {
      this.subject.next(new Message("Import in progress", "error"));
      return;
    }
    try {
      this.state_subject.next("importing_stage1");
      $(e.target)
        .attr("disabled", true)
        .closest("label")
        .attr("disabled", true);
      result = this.fileUploadService.upload(e.target.files[0]).then(
        res => {
          this.state_subject.next("importing_stage2");
          try {
            this.service
              .import(res.data.filename, res.data.filetype, null, overwrite)
              .then(res => {})
              .catch(err => {
                console.log(err);
                this.state_subject.next("import_stage2_fail");
                if (err.status == 409)
                  this.subject.next(new Message(err._body, "error"));
                else this.subject.next(new Message("Import error", "error"));

                $(e.target)
                  .attr("disabled", false)
                  .closest("label")
                  .attr("disabled", false);
              });
          } catch (e) {
            this.subject.next(new Message(e.message, "error"));
          }
        },
        err => {
          this.state_subject.next("import_stage1_fail");
          this.subject.next(new Message("Import error", "error"));
        }
      );
    } catch (error) {
      this.subject.next(new Message("Import error", "error"));
    }
  }

  /**
   * @param {Event} e - File Input change event
   * @returns {void}
   */
  importOneHandler(e: any, t: Translation): void {
    let result;
    let overwrite = true; //!confirm('Overwrite similar files?');
    // console.log(this.data[this.data.indexOf(t)]);

    if (this.state.indexOf("importing") == 0) {
      this.subject.next(new Message("Import in progress", "error"));
      return;
    }
    try {
      this.state_subject.next("importingOne_stage1");
      $(e.target).attr("disabled", true).closest("label").addClass("loading");
      result = this.fileUploadService.upload(e.target.files[0]).then(
        res => {
          this.state_subject.next("importingOne_stage2");

          this.service
            .import(
              res.data.filename,
              res.data.filetype,
              t.audio().filename,
              overwrite
            )
            .then(res => {
              $(e.target)
                .attr("disabled", false)
                .closest("label")
                .removeClass("loading");
              this.subject.next(new Message("Uploaded"));
              this.translationService.get(t.id).then(res => {
                let index = this.data.indexOf(t);
                let translation = this.data[index];
                translation = new Translation();

                for (let i in res) {
                  if (i == "audio_stack")
                    for (let j in res[i]) {
                      translation[i][j] = new TranslationAudio();
                      for (let k in res[i][j])
                        translation[i][j][k] = res[i][j][k];
                    }
                  else translation[i] = res[i];
                }

                this.data[index] = translation;
                this.state_subject.next("importOne");
              });
            })
            .catch(err => {
              console.log(err);
              $(e.target)
                .attr("disabled", false)
                .closest("label")
                .removeClass("loading");
              this.state_subject.next("importingOne_stage2_fail");
              if (err.status == 409)
                this.subject.next(new Message(err._body, "error"));
              else this.subject.next(new Message("Upload error", "error"));
            });
        },
        err => {
          this.state_subject.next("importingOne_stage1_fail");
          this.subject.next(new Message("Import error", "error"));
        }
      );
    } catch (error) {
      this.subject.next(new Message("Upload error", "error"));
    }
  }
}
