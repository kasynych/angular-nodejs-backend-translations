import { NgModule } from "@angular/core";
import { CrudService } from "../common/crud_service";
import { Translation } from "common/translation";

@NgModule({})
export /**
 * Translation Service class
 * @class
 * @extends CrudService
 */
class TranslationService extends CrudService {
  
  /**
   * @protected {string} url - URL
   */
  protected url: string = this.getApiUrl() + "/api/translations";

  /**
   * Get translations
   * @param {number} project_id 
   * @param {number} language_id 
   */
  getTranslations(
    project_id: number,
    language_id: number,
    page: number = 1
  ): Promise<Translation[]> {
    let url = this.url;
    this.url =
      this.url + "?project_id=" + project_id + "&language_id=" + language_id;

    if(page != null) this.url += '&page='+page;
    let promise = this.http
      .get(this.url, { headers: this.headers })
      .toPromise()
      .then(res => {
        this.url = url;
        return res.json().data as Translation[];
      });
    return promise;
  }
}
