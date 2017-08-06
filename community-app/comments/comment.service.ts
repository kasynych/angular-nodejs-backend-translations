import { NgModule } from "@angular/core";
import { CrudService } from "../common/crud_service";

@NgModule({})
export /**
 * Comment Service class
 * @class
 * @extends CrudService
 */

class CommentService extends CrudService {
  protected url: string = this.getApiUrl() + "/api/comments";
}
