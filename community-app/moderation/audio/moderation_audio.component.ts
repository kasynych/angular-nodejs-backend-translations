import { Component, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

const $ = require('jQuery');

import { ListComponent } from '../../common/list_component';
import { List } from '../../common/list.interface';
import { Translation } from '../../common/translation';
import { TranslationAudio } from '../../common/translation_audio';
import { TranslationService } from '../../translations/translation.service';
import{ TranslationAudioService } from'../../translations/audio/translation_audio.service';
import { Message } from "../../common/message";
import { Language } from "common/language";
import { Project } from "common/project";
import { Logger } from "common/logger";

@Component({
  selector: "moderation-audio",
  templateUrl: "./moderation_audio.component.html",
  styleUrls: ["./moderation_audio.component.css"],
  providers: [TranslationAudioService,TranslationService]
})
export class ModerationAudioComponent extends ListComponent implements List{

  /**
   * @property {Translation[]} data - Component Model
   * @property {Language} language - Translation language
   * @property {Project} project - Translation project
   */
  public data: Translation[] = null;
  public language: Language = new Language();
  public project: Project = new Project();

  /**
   * @constructs Moderation Audio Component
   * @param {TranslationAudioService} service 
   * @param {TranslationService} translationService 
   * @param {ActivatedRoute} route 
   */
  constructor(protected service: TranslationAudioService,
              private translationService: TranslationService,
              private route: ActivatedRoute){
    super();
    this.state_subject.next("construct");
  }

  /**
   * Loads Component model
   * @param {number} [project_id] - Project ID
   * @param {number} [language_id] - Language ID
   * @returns {Promise<Translation[]>}
   */
  load(): Promise<any> {

    if(this.project == null || this.language == null) return;
    
    let promise = this.translationService.getTranslations(
      this.project.id,
      this.language.id,
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
   * Set Language
   * @param {Language} language - Language
   * @returns {void}
   */
  @Input() set setLanguage(language: Language){
    this.language = language;
    this.load();
  }

  /**
   * Approve Translation Audio Click event handler
   * @param {Event} e - Click Event
   * @param {Translation} translation - Translation
   * @returns {void}
   */
  approveTrAuClick(e: Event,translation: Translation):void{
    translation.audio().instructions = 'approved';
    this.translationService.put(translation)
    .then(res => {
      this.subject.next(new Message('Translation audio approved'));
      this.state_subject.next('approve translation audio');
      this.state_subject.next("load");
    })
    .catch(res => {
      this.subject.next(new Message('Error','error'));
      this.state_subject.next('approve translation audio error');
      this.state_subject.next("load");
    })
  }

  /**
   * reject Translation Audio Click event handler
   * @param {Event} e - Click Event
   * @param {Translation} translation - Translation
   * @returns {void}
   */
  rejectTrAuClick(e: Event,translation: Translation){
    translation.audio().instructions = 'change needed';
    console.log(translation);
    this.translationService.put(translation)
    .then(res => {
      this.subject.next(new Message('Translation audio rejected'));
      this.state_subject.next('reject translation audio');
      this.state_subject.next("load");
    })
    .catch(res => {
      this.subject.next(new Message('Error','error'))
      this.state_subject.next('reject translation audio error');
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
    translation.audio().note.stateSubject().next('focus');
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
    setTimeout(function(){translation.audio().note.stateSubject().next('blur');},150);
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
    translation.audio().note.stateSubject().next('cancel');
  }

  /**
   * Note Save Click event handler
   * @param {Event} e - Click Event
   * @param {Translation} translation - Translation
   */
  TNoteSaveClick(e: Event, translation: Translation):void{
    translation.audio().note.text = translation.audio().note.text.substr(0,255);
    this.translationService.put(translation)
    .then(res => {
      translation.audio().note.stateSubject().next('update');
      translation.audio().note.stateSubject().next('blur');
      this.subject.next(new Message('Moderator Comments updated'));
    })
    .catch(res => {
      translation.audio().note.stateSubject().next('update error');
      translation.audio().note.stateSubject().next('blur');
    })
  }
}