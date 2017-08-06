import { Component, Input } from '@angular/core';

import { ListComponent } from '../../common/list_component';
import { Data} from '../../common/data';
import { TranslationService } from '../../translations/translation.service';
import { List } from "common/list.interface";
import { CommentService } from "comments/comment.service";
import { Message } from "common/message";
import { Project } from "common/project";
import { Language } from "common/language";
import { Translation } from "common/translation";
import { Logger } from "common/logger";

@Component({
  selector: "moderation-comments",
  templateUrl: "./moderation_comments.component.html",
  styleUrls: ["moderation_comments.component.css"],
  providers: [TranslationService,CommentService]
})

/**
 * Moceration Comments class
 * @class
 * @extends ListComponent
 * @implements List
 */
export class ModerationCommentsComponent extends ListComponent implements List{

  /**
   * @property {Language} language - Language
   * @property {Project} project - Project
   * @property {Comment[]} data - Component model
   */
  public language: Language;
  public project: Project;
  public data:Comment[] = [];

  /**
   * @constructs ModerationCommentsComponent
   * @param {CommentService} service 
   * @param {TranslationService} translationService
   * @returns {void}
   */
  constructor(protected service: CommentService,
              protected translationService: TranslationService) {
    super();
    this.state_subject.next("construct");
  }

  /**
   * Load model
   * @returns {Promise<Comment[]>}
   */
  load():Promise<Translation[]>{
    let project_id = null;
    let language_id = null;
    if(this.project != null) project_id = this.project.id;
    if(this.language != null) language_id = this.language.id;
    
    let promise = this.translationService.getTranslations(
      project_id,
      language_id,
      this.pagination.page
    );
    this.state_subject.next("loading");

    promise.then(res => {
      this.data= [];
      let obj =this;
//      res.map(t => obj.data.push(new Translation(t)));
      Logger.log(this.data);
      this.state_subject.next("load");
    }).catch(err => {
      this.subject.next(new Message(err,'error'));
      this.state_subject.next("load_failed")
    });

    return promise;
  }

  /**
   * Init component
   * @returns {void}
   */
  onInit(){
    this.load().then(res =>this.state_subject.next("init"));
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
}