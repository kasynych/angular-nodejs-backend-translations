import { NgModule } from "@angular/core";

import { CrudService } from "../common/crud_service";
import { TranslationAudio } from "../common/translation_audio";
import { Response } from "../common/response";

@NgModule({})
export abstract class TranslationMediaService extends CrudService {
  /**
   * Get translations
   * @param {number} project_id 
   * @param {number} language_id 
   */
  getTranslationsAudio(project_id: number, language_id: number): Promise<any> {
    let url = this.url;
    this.url =
      this.url + "?project_id=" + project_id + "&language_id=" + language_id;
    let promise = super.get();
    promise.then(res => (this.url = url));
    return promise;
  }

  import(
    filename: string,
    filetype: string,
    t_a_filename: string = null,
    overwrite: boolean = true
  ): Promise<Response> {
    if (filetype == "audio/mp3" && typeof t_a_filename == "undefined")
      throw new Error("Wrong parameters");
    let data = {
      filename: filename,
      filetype: filetype,
      t_a_filename: null,
      overwrite: overwrite ? "1" : "0"
    };

    if (t_a_filename != null) data.t_a_filename = t_a_filename;
    return this.http
      .put(this.url + "/import", data, { headers: this.headers })
      .toPromise()
      .then(res => res.json() as Response)
      .catch(this.handleError);
  }

  checkImport(): Promise<Response> {
    return this.http
      .get(this.url + "/import/check")
      .toPromise()
      .then(res => res.json() as Response);
  }
}
