import { Component } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

import { ListComponent } from "../common/list_component";
import { List } from "../common/list.interface";
import { TranslationService } from "./translation.service";
import { ItemService } from "../items/item.service";
import { Translation } from "../common/translation";
import { TranslationField } from "../common/translation_field";
import { Item } from "../common/item";
import { Logger } from "../common/logger";
import { Language } from "../common/language";
import { Project } from "../common/project";
import { Response } from "../common/response";
import { TranslationAudio } from "common/translation_audio";
import { TranslationImage } from "common/translation_image";

const $ = require("jQuery");

@Component({
  selector: "translations",
  templateUrl: "./translations.component.html",
  styleUrls: ["./translations.component.css"],
  providers: [TranslationService, ItemService]
})
export /**
 * Translations Component class
 * @class
 * @extends ListComponent
 * @implements List
 */
class TranslationsComponent extends ListComponent implements List {
  /**
   * @property {TranslationField[]} data - Component model
   * @property {Translation} selected_translation - Selected translation
   * @property {Language} language - Translation language
   * @property {Project} project - Translation project
   * @property {Object} state_translations_observer - state_translations_observer
   */
  public data: TranslationField[] = [];
  public selected_translation: Translation = null;
  public language: Language = new Language();
  public project: Project = new Project();
  protected state_translations_observer = {
    next: x => {
      switch (x) {
        case "load":
          this.selected_translation = null;
        case "load_fail":
          break;
      }
    }
  };

  /**
   * @constructs TranslationsComponent
   * @param {TranslationService} service 
   * @param {ItemService} item_service 
   * @param {ActivatedRoute} route
   * @returns {void}
   */
  constructor(
    protected service: TranslationService,
    protected item_service: ItemService,
    private route: ActivatedRoute
  ) {
    super();
    this.state_subject.subscribe(this.state_translations_observer);
    this.state_subject.next("construct");
  }

  /**
   * Loads component model
   * @param {number} [project_id] - Project ID
   * @param {number} [language_id] - Language ID
   * @returns {Promise<Item[]>}
   */
  load(project_id?: number, language_id?: number): Promise<any> {
    if (typeof project_id == "undefined") project_id = this.project.id;
    if (typeof language_id == "undefined") language_id = this.language.id;

    let promise = this.service.getTranslations(project_id, language_id, this.pagination.page);
    this.state_subject.next("loading");
    promise
      .then(data => {
        if (data.length > 0) {
          this.language = data[0].language;
          this.project = data[0].project;
          console.log(data[0]);
          Logger.log(
            this.data = data.map(translation => {
                let ret = new Translation();
                for (let i in translation) {
                  if (i == "audio_stack" || i == "images_stack")
                    for (let j in translation[i]) {
                      if (i == "audio_stack")
                        ret[i][j] = new TranslationAudio();
                      else ret[i][j] = new TranslationImage();
                      for (let k in translation[i][j])
                        ret[i][j][k] = translation[i][j][k];
                    }
                  else ret[i] = translation[i];
                }
                return new TranslationField(ret)
              }
            )
          );
          this.state_subject.next("load");
        } else this.state_subject.next("load_empty");
      })
      .catch(err => {
        this.state_subject.next("load_failed");
      });
    return promise;
  }

  /**
   * Init component
   * @returns {void}
   */
  onInit(): void {
    this.route.params
      .switchMap((params: Params) => this.load(+params["id1"], +params["id2"]))
      .subscribe(res => {
        this.state_subject.next("init");
      });
  }

  /**
   * Stores translation
   * @param {Translation} translation
   * @returns {Prommise<Response>}
   */
  save(translation_field: TranslationField): Promise<Response> {
    if (translation_field.text == null)
      return new Promise(() => {
        new Response();
      });

    let translation: Translation = translation_field.toTranslation();
    translation.text = translation.text.trim();
    if (translation.id == 0) {
      translation.status = "New";
      this.data.push(translation as TranslationField);
      return this.service.post(translation);
    } else {
      return this.service.put(translation);
    }
  }

  /**
   * KeyUp Event Handler
   * @param {Event} e 
   * @param {Translation} translation 
   */
  translationKeyUp(e: KeyboardEvent, translation: TranslationField): boolean {
    var obj = $(e.target);
    switch (e.which) {
      case 9:
        break;
      case 13: //enter
        if (e.ctrlKey) {
          obj.blur();
          obj.closest("tr").nextAll().find("textarea").first().focus();
        }

        break;
      case 27: //esc
        translation.text = translation.stored_text;
        translation.state_observer.next("stored");
        break;
      default:
        if (translation.text != translation.stored_text)
          translation.state_observer.next("not stored");
    }
    return true;
  }

  /**
   * Focus event handler
   * @param {Event} e 
   * @param {Translation} translation 
   */
  translationFocus(e: Event, translation: TranslationField): void {
    this.selected_translation = translation.toTranslation();
    $("#translations tr").removeClass("warning");
    $(e.target).closest("tr").addClass("warning");
  }

  /**
   * Blur Event Handler
   * @param {Event} e 
   * @param {Translation} translation 
   */
  translationBlur(e: Event, translation: TranslationField): void {
    if (translation.state == "stored") return;
    translation.state_observer.next("storing");
    this.save(translation)
      .then(response => {
        if (
          typeof response.data != "undefined" &&
          typeof response.data.translation_id != "undefined"
        ) {
          translation.id = response.data.id;
          translation.status = "Translated";
        }
        translation.stored_text = translation.text;
        translation.state_observer.next("stored");
      })
      .catch(response => {
        translation.error = response.message;
        translation.state_observer.next("not stored");
      });
  }

  /**
   * Cancel translation click event handler
   * @param {Event} e 
   * @param {Translation} translation 
   * @returns {void}
   */
  cancelTransationClick(e: Event, translation: TranslationField): void {
    let textarea = $(e.target).closest(".form-group").find("textarea");
    translation.text = translation.stored_text;
    translation.error = null;
    translation.state = "stored";
  }

  /**
   * Ignore translation error click event handler
   * @param {Event} e
   * @param {Translation} translation
   * @returns {void}
   */
  ignoreTransationClick(e: Event, translation: TranslationField): void {
    translation.error = null;
  }
}
