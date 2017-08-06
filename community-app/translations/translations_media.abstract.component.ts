import { ListComponent } from "../common/list_component";
import { Subject } from "rxjs/Subject";
const $ = require("jQuery");
import { Translation } from "../common/translation";
import { Project } from "../common/project";
import { Language } from "../common/language";
import { Message } from "../common/message";
import { TranslationService } from "./translation.service";
import { Data } from "../common/data";
export abstract class TranslationsMediaComponent extends ListComponent {
  /**
   * @property {Translation[]} data - Component Model
   * @property {Language} language - Translation language
   * @property {Project} project - Translation project
   * @property {number} media_zip_upload_progress -  Audio Zip Upload Progress
   * @property {Sublect<number>} upload_subject - upload_subject
   * @property {Object} state_translations_media_observer - state_translations_media_observer
   * @property {number} check_interval - Check import state interval
   */
  public data: Translation[] = [];
  public language: Language = new Language();
  public project: Project = new Project();
  public media_zip_upload_progress: number = null;
  public media_zip_import_progress: number = null;
  public upload_subject: Subject<number>;
  protected check_interval: number = 1000 + Math.round(Math.random() * 3000);
  protected get_signed_url_rate: number = 5;
  protected stage1_rate: number = 40 + Math.round(Math.random() * 20);
  protected stage2_rate: number = 100 -
    this.get_signed_url_rate -
    this.stage1_rate;
  protected service: any;
  protected state_translations_media_observer = {
    next: x => {
      switch (x) {
        case "load":
        case "load_fail":
          break;
        case "importing_stage1":
          break;
        case "importing_stage2":
          let obj = this;
          let check_iteration = 0;
          let int = setInterval(function() {
            check_iteration++;

            if (obj.state == "importing_stage2")
              obj.service.checkImport().then(res => {
                if (Data.environment == "dev" || Data.environment == "dev")
                  console.log(res.data.progress);
                obj.upload_subject.next(
                  Math.round(
                    obj.get_signed_url_rate +
                      obj.stage1_rate +
                      obj.stage2_rate * res.data.progress / 100
                  )
                );
                if (res.data.progress >= 100) {
                  obj.subject.next(new Message("Import completed"));
                  obj.state_subject.next("import");
                  $("#media-import-form")
                    .find("input")
                    .attr("disabled", false)
                    .closest("label")
                    .attr("disabled", false);
                }
              });

            if (obj.state != "importing_stage2") {
              clearInterval(int);
              return;
            }
          }, this.check_interval);
          break;
        case "import":
          this.refresh();
        case "importOne":
          this.state_subject.next("idle");
          break;
      }
    }
  };
  protected upload_observer = {
    next: x => {
      if (this.state.indexOf("importing_") != 0) return;
      this.media_zip_import_progress = x;

      if (this.media_zip_import_progress > 100)
        this.media_zip_import_progress = 100;

      $("#media_zip_progress .progress-bar").html(
        this.media_zip_import_progress + "%"
      );
      $("#media_zip_progress .progress-bar").css(
        "width",
        this.media_zip_import_progress + "%"
      );

      if (this.media_zip_import_progress == 100)
        $("#media_zip_progress").addClass("fade-out");
      else if (this.media_zip_import_progress <= 5)
        $("#media_zip_progress").removeClass("fade-out");
    }
  };

  /**
   * @constructs TranslationsMediaComponent
   */
  constructor() {
    super();
  }
}
