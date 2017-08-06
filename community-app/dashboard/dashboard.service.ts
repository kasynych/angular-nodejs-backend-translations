import { NgModule } from "@angular/core";

import { CrudService } from "../common/crud_service";
import { Data } from "../common/data";
@NgModule({})
export /**
 * Dashboard Service class
 * @class
 * @extends CrudService
 */
class DashboardService extends CrudService {
  /**
   * @property {string} url - service end point url
   */
  protected url: string = this.getApiUrl() + "/api/dashboard";

  /**
   * Get dashboard data
   * @returns {Promise<any>}
   */
  get(): Promise<any> {
    let url = this.url;
    switch (Data.account.role.toLowerCase()) {
      case "super admin":
        url += "/super_admin";
        break;
      case "admin":
        url += "/admin";
        break;
      case "moderator":
        url += "/moderator";
        break;
      case "translator":
        url += "/translator";
        break;
      case "audio editor":
        url += "/audio_editor";
        break;
      case "designer":
        url += "/designer";
        break;
    }

    return this.http
      .get(url)
      .toPromise()
      .then(response => response.json().data)
      .catch(error => error);
  }
}
