import { NgModule } from "@angular/core";

import "rxjs/add/operator/toPromise";

import { Language } from "../common/language";
import { CrudService } from "../common/crud_service";

@NgModule({})
export /**
 * Language Service class
 * @class
 * @extends CrudService
 */
class LanguageService extends CrudService {
  /**
   * @protected {string} url;
   */
  protected url: string = this.getApiUrl() + `/api/languages`;
}
