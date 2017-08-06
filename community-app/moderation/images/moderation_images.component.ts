import { Component, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

const $ = require('jQuery');

import { ListComponent } from '../../common/list_component';
import { List } from '../../common/list.interface';
import { Translation } from '../../common/translation';
import { TranslationImage } from '../../common/translation_image';
import { TranslationService } from '../../translations/translation.service';
import{ TranslationImageService } from '../../translations/images/translation_image.service';
import { Message } from "../../common/message";
import { Language } from "common/language";
import { Project } from "common/project";
import { Logger } from "common/logger";

@Component({
  selector: "moderation-images",
  templateUrl: "./moderation_images.component.html",
  styleUrls: ["./moderation_images.component.css"],
  providers: [TranslationImageService,TranslationService]
})
export class ModerationImagesComponent extends ListComponent implements List{

  /**
   * @property {Translation[]} data               - Component Model
   * @property {Project} project                  - Translation project
   * @property {Translation} selected_translation - Selected translation
   */
  public data: Translation[] = null;
  public project: Project = new Project();
  public selected_translation: Translation = null;
  protected state_moderation_images_observer = {
    next: x => {
      switch (x) {
        case "loading":
        case "load_empty":
        case "load_fail":
          this.selected_translation = null;
          break;
        case "load":
        case "importOne":
          break;
      }
    }
  };

  /**
   * @constructs Moderation Images Component
   * @param {TranslationImagesService} service 
   * @param {TranslationService} translationService 
   * @param {ActivatedRoute} route 
   */
  constructor(protected service: TranslationImageService,
              private translationService: TranslationService,
              private route: ActivatedRoute){
    super();
    this.state_subject.subscribe(this.state_moderation_images_observer);
    this.state_subject.next("construct");
  }

  /**
   * Loads Component model
   * @param {number} [project_id] - Project ID
   * @param {number} [language_id] - Language ID
   * @returns {Promise<Translation[]>}
   */
  load(): Promise<any> {

    if(this.project == null) return;
    
    let promise = this.translationService.getTranslations(
      this.project.id,
      16/*English*/,
      this.pagination.page
    );
    this.state_subject.next("loading");

    promise.then(res => {
      this.data= [];
      let obj =this;
      res.map(t => obj.data.push(new Translation(t)));
      Logger.log(this.data);
      this.state_subject.next("load");
    }).catch(err => {
      this.subject.next(new Message(err,'Error'));
      this.state_subject.next("load_failed")
    });

    return promise;
  }

  /**
   * Init Component
   * @returns {void}
   */
  onInit(){
//    this.load(this.project.id,this.language.id).then(res => this.state_subject.next("init"));
    this.state_subject.next("init");
  }

  /**
   * Set Project
   * @param {Project} project - Project
   * @returns {void}
   */
  @Input() set setProject(project: Project){
    this.project = project;
    this.load();
  }

  /**
   * Approve Translation Images Click event handler
   * @param {Event} e - Click Event
   * @param {Translation} translation - Translation
   * @returns {void}
   */
  approveTrImClick(e: Event,translation: Translation):void{
    translation.image().instructions = 'approved';
    this.translationService.put(translation)
    .then(res => {
      this.subject.next(new Message('Translation image approved'));
      this.state_subject.next('approve translation image');
      this.state_subject.next("load");
    })
    .catch(res => {
      this.subject.next(new Message('Error','error'));
      this.state_subject.next('approve translation image error');
      this.state_subject.next("load");
    })
  }

  /**
   * reject Translation Images Click event handler
   * @param {Event} e - Click Event
   * @param {Translation} translation - Translation
   * @returns {void}
   */
  rejectTrImClick(e: Event,translation: Translation){
    translation.image().instructions = 'change needed';
    
    this.translationService.put(translation)
    .then(res => {
      this.subject.next(new Message('Translation image rejected'));
      this.state_subject.next('reject translation image');
      this.state_subject.next("load");
    })
    .catch(res => {
      this.subject.next(new Message('Error','error'))
      this.state_subject.next('reject translation image error');
      this.state_subject.next("load");
    })
  }

  /**
   * Note Textarea Focus Event handler
   * @param {Event} e - Focus event
   * @param {Translation} translation - translation
   * @returns {void}
   */
  TNoteFocus(e: Event, translation: Translation):void{
    translation.image().note.stateSubject().next('focus');
  }

  /**
   * Note Textarea Click Event handler
   * @param {Event} e - Focus event
   * @param {Translation} translation - translation
   * @returns {void}
   */
  TNoteClick(e: Event, translation: Translation):void{
    this.TNoteFocus(e,translation);
  }

  /**
   * Note Textarea Blur Event handler
   * @param {Event} e - Blur event
   * @param {Translation} translation - translation
   * @returns {void}
   */
  TNoteBlur(e: Event, translation: Translation):void{
    setTimeout(function(){translation.image().note.stateSubject().next('blur');},150);
  }

  /**
   * Note Cancel Click event handler
   * @param {Event} e - Click event
   * @param {Translation} translation - translation
   * @returns {void}
   */
  TNoteCancelClick(e: Event, translation: Translation):void{
    $(e.target).focus();
    document.execCommand("undo"); 
    translation.image().note.stateSubject().next('cancel');
  }

  /**
   * Note Save Click event handler
   * @param {Event} e - Click Event
   * @param {Translation} translation - Translation
   */
  TNoteSaveClick(e: Event, translation: Translation):void{
    translation.image().note.text = translation.image().note.text.substr(0,255);
    this.translationService.put(translation)
    .then(res => {
      translation.image().note.stateSubject().next('update');
      translation.image().note.stateSubject().next('blur');
      this.subject.next(new Message('Moderator Comments updated'));
    })
    .catch(res => {
      translation.image().note.stateSubject().next('update error');
      translation.image().note.stateSubject().next('blur');
    })
  }

  /**
   * Focus event handler
   * @param {Event} e 
   * @param {Translation} translation 
   */
  translationRowClick(e: Event, translation: Translation): void {
    if($(e.target).closest("tr").length == 0) return;
    this.selected_translation = translation;
    $("#translations tr").removeClass("warning");
    $(e.target).closest("tr").addClass("warning");
  }
}