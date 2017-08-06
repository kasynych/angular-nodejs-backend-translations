import { NgModule } from "@angular/core";
import { CrudService } from "../common/crud_service";

@NgModule({})
export class ItemService extends CrudService {
  protected url = "/api/translations";

  /**
   * Http.get() layer
   * @param {number} id
   * @returns {Promise<any>}
   */
  // get (id:number = null): Promise<any> {
  //   this.url =
  // }
}
