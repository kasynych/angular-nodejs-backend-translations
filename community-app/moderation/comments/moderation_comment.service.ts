import { CrudService } from "common/crud_service";
import { NgModule } from "@angular/core";

import { CommentExtended } from 'common/comment';
import { Response } from 'common/response';

@NgModule({

})

export class ModerationCommentService extends CrudService{
  
  /**
   * @protected {string} url - URL
   */
  protected url: string = this.getApiUrl() + "/api/comments";

  /**
   * Gets new comment
   * @returns {Promise<CommentExtended>}
   */
  public getNewOne(ignore_uuids: Array<string> = []):Promise<CommentExtended>{
    let url = this.url;
    this.url = this.url+'/new-one';
    if(ignore_uuids.constructor == Array)
      this.url += '?ignore_uuids='+ignore_uuids.join(',');
    console.log(this.url);
    return this.get(null,null)
            .then(res => {
              this.url = url;
              return res as CommentExtended
            })
            .catch(this.handleError);
  }

  /**
   * Update comment
   * @param {CommentExtended} comment - comment
   */
  public update(comment: CommentExtended, action?: string):Promise<Response>{
    let url = this.url;
    this.url += '?action='+action;

    return this.http
      .put(this.url, JSON.stringify(comment), { headers: this.headers })
      .toPromise()
      .then(res => {
      this.url = url;
      return res;})
      .catch(this.handleError);
  }
}