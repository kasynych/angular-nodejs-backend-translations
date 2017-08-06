import { Component, Input } from '@angular/core';
import { ComponentBase } from "common/component_base";
import { ModerationCommentService } from "moderation/comments/moderation_comment.service";
import { Comment, CommentExtended } from 'common/comment';
import { Message } from "common/message";
import { Logger } from "common/logger";
import { Translation } from "common/translation";
const $ = require('jQuery');

@Component({
  selector: 'moderation-comment',
  templateUrl: './moderation_comment.component.html',
  styleUrls: ["moderation_comment.component.css"],
  providers: [ModerationCommentService]
})
export class ModerationCommentComponent extends ComponentBase{

  /**
   * @property {Comment} data - Component model
   * @property {Array<any>} parents - Parents tree
   * @property {boolean} show_edit_textarea -  Show edit textarea flag
   * @property {Comment[]} skipped_comments - Skipped Comments
   */
  public data: CommentExtended = null;
  public parents: Array<any> = [];
  public show_edit_textarea: boolean = null;
  public skipped_comments: Comment[] = [];
  
  /**
   * @constructs ModerationCommentComponent
   * @param {ModerationCommentService} service - Service
   * @returns {void}
   */
  constructor(protected service: ModerationCommentService){
    super();
    this.state_subject.next("construct");
  }

  /**
   * Load component model
   * @returns [Promise<Comment>]
   */
  load():Promise<Comment>{
    let ignore_uuids = [];
    if(this.skipped_comments.length >= 47)
      this.skipped_comments.shift();
    this.skipped_comments.forEach(function(c){ ignore_uuids.push(c.uuid)});
    let promise = this.service.getNewOne(ignore_uuids);
    this.state_subject.next("loading");
    promise.then(res => {
      this.data = new CommentExtended(res);
      this.parents = [];
      let comment = res;
      while(typeof comment.parent_comment != 'undefined' && comment.parent_comment != null){
        this.parents.push(new Comment(comment.parent_comment));
        comment = comment.parent_comment;
      }

      if(typeof comment.parent_translation != 'undefined' && comment.parent_translation != null)
        this.parents.push(new Translation(comment.parent_translation));
      Logger.log(this.data);
      this.state_subject.next("load");
    })
    .catch(err => {
      this.subject.next(new Message('Error','error'));
      this.state_subject.next("load_failed")
    });
    
    return promise;
  }

  /**
   * Init component
   * @returns {void}
   */
  onInit():void{
    this.load().then(res => {
      this.state_subject.next('init');
    });
  }

  /**
   * Toggle Edit Click event handler
   * @param {Event} e - Click event
   */
  editCommentClick(e: Event):void{
    this.show_edit_textarea = !this.show_edit_textarea;
    let obj = this;
    $('textarea#comment_edit').css('height','auto').parent().css('height','auto');
    $('textarea#comment_edit').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
      if (obj.show_edit_textarea === false)
        $(this).css('height','0px').parent().css('height','0px');
    });
  }

  /**
   * Submit Click eventhandler
   * @param {Event} e
   * @param {string} action
   */
  submitClick(e: Event, action: string):void{

    if(action == 'skip')
      this.skipped_comments.push(this.data);
    this.state_subject.next('submitting');
    this.service.update(this.data,action)
      .then(res => { 
        this.state_subject.next('submit');
        this.show_edit_textarea = null;
        $('#comment_moderation_form').removeClass('fadeInRight').addClass('bounceOutLeft');
        let t0 = Date.now();

        if(action.indexOf('approve') != -1)
          this.subject.next(new Message('Comment approved'));
        else if(action.indexOf('reject') != -1 )
          this.subject.next(new Message('Comment disapproved'));
        else if(action.indexOf('ban') != -1)
          this.subject.next(new Message('Comment disapproved and user banned'));
        let obj =this;

        let timeout = 0;
        
        if(Date.now()-t0 < 1000) timeout = 1000;
        setTimeout(
          function(){
            obj.load()
          },timeout);
        
      })
      .catch(err => {
        this.subject.next(new Message(err,'error'));
        this.state_subject.next('submit_fail');
      })
  }
}