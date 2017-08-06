import { NgModule } from "@angular/core";

import "rxjs/add/operator/toPromise";

import { Project } from "../common/project";
import { CrudService } from "../common/crud_service";

@NgModule({})
export /**
 * Project Service class
 * @class
 * @extends CrudService
 */
class ProjectService extends CrudService {
  protected url: string = this.getApiUrl() + `/api/projects`;
}
