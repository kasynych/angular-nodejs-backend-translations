import { User } from "./user";
import { Translation } from "./translation";
import { JsonDoc } from "common/json_doc";

/**
 * Comment class
 * @class
 */
export class Comment extends JsonDoc{

  /**
   * @property {User} user          - Commentator
   * @property {string} created     - When comment was created
   * @property {string} updated     -  When comment was updated
   * @property {string} text        - Comment text
   * @property {number} score       - Comment score
   * @property {Comment[]} comments - Comments
   * @property {string} status      - Status
   */
  public created: string = Date.now().toString();
  public updated: string = Date.now().toString();
  public text: string = "";
  public user: User = new User();
  public score: number = 0;
  public comments: Comment[] = [];
  public status: string = "new";

  constructor(comment?) {
    super(comment);

    if (typeof comment != "undefined") {
      this.created = comment.created;
      this.updated = comment.updated;
      this.text = comment.text;
      this.user = new User(comment.user);
      this.score = comment.score;
      this.comments = comment.comments.map(comment => new Comment(comment));
      this.status = comment.status;
    }
  }
}

/**
 * Comment Extended class
 * @class
 * @extends Comment
 */
export class CommentExtended extends Comment{

  /**
   * @property {Translation} parent_translation - Parent Translation
   * @property {Comment} parent_comment - Parent Comment
   */
  public parent_translation: Translation = null;
  public parent_comment: CommentExtended = null;

  constructor(comment?){
    super(comment);

    if(typeof comment.parent_translation != 'undefined' && comment.parent_translation!=null){
      this.parent_translation =  new Translation(comment.parent_translation);
      this.parent_translation.comments = [];
    }

    if(typeof comment.parent_comment != 'undefined' && comment.parent_comment!=null){
      this.parent_comment =  new CommentExtended(comment.parent_comment);
      this.parent_comment.comments = [];
    }
  }
}
