import { Component, Input } from "@angular/core";

import { ComponentBase } from "../common/component_base";
import { Comment } from "../common/comment";
import { CommentService } from "./comment.service";
import { TranslationService } from "../translations/translation.service";
import { Translation } from "common/translation";
import { Data } from "common/data";
import { User } from "common/user";
const uuidv1 = require("uuid/v1");
const $ = require("jQuery");

@Component({
  selector: "chat",
  templateUrl: "./comments.component.html",
  styleUrls: ["./comments.component.css"],
  providers: [CommentService, TranslationService]
})
export /**
 * Comments Component class
 * @class
 * @extends ComponentBase
 */
class CommentsComponent extends ComponentBase {
  /**
   * @property {Comment[]} data - Component model
   * @property {string} comment - Comment text
   * @property {Object} state_comments_observer - state_comments_observer
   * @property {Translation} _translation - Translation
   */
  public data: Comment[] = null;
  public comment: string = "";
  public _translation?: Translation = null;
  protected state_comments_observer = {
    next: x => {
      switch (x) {
        case "construct":
          break;
        case "display":
          this.comment = "";
          break;
        case "creating comment":
          break;
        case "error creating comment":
          break;
      }
    }
  };

  /**
   * @constructs CommmentsComponent
   * @param {CommentService} service
   * @returns {void}
   */
  constructor(
    protected service: CommentService,
    protected translation_service: TranslationService
  ) {
    super();
    this.state_subject.subscribe(this.state_comments_observer);
    this.state_subject.next("construct");
  }

  /**
   * sets translation
   * @param {Translation} translation
   * @returns {void}
   */
  @Input() set translation(translation: Translation) {
    this.data = translation.comments;
    this.state_subject.next("display");
    this._translation = translation;
  }

  /**
   * Chat Comment Key Up event handler
   * @param {KeyboardEvent} e
   * @returns {void}
   */
  chatCommentKeyUp(e: KeyboardEvent): void {
    if (e.which == 13) {
      this.save(e);
    }
  }

  /**
   * Chat Commnet Submit Click event handler
   * @param {Event} e
   * @returns {void}
   */

  chatCommentSubmit(e: Event): void {
    this.save(e);
  }

  /**
   * Saves comment
   * @param {Event} e
   * @returns {void}
   */

  save(e: Event): void {
    if ($("#chat_comment_field input").val() == "") return;
    this.state_subject.next("creating comment");
    let comment = new Comment();
    comment.uuid = uuidv1();
    comment.text = $("#chat_comment_field input").val();
    comment.created = Date.now() + "";
    comment.updated = Date.now() + "";
    comment.user = Data.account as User;
    comment.score = 0;
    comment.comments = [];

    this._translation.comments.push(comment);
    this.comment = "";
    this.translation_service
      .put(this._translation)
      .then(res => this.state_subject.next("display"))
      .catch(err => this.state_subject.next("error creating comment"));
  }
}
