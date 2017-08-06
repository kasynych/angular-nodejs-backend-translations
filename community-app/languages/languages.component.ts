import { Component } from "@angular/core";

import { LanguageService } from "./language.service";
import { Language } from "../common/language";
import { ListComponent } from "../common/list_component";
import { List } from "../common/list.interface";
import { Logger } from "common/logger";

@Component({
  selector: "languages",
  templateUrl: "./languages.component.html",
  styleUrls: ["./languages.component.css"],
  providers: [LanguageService]
})
export /**
 * Languages Component Class
 * @class
 * @extends ListComponent
 * @implements List
 */
class LanguagesComponent extends ListComponent implements List {
  /**
   * 
   */
  public data: Language[] = null;

  /**
   * @constructs LanguagesComponent
   * @param {LanguageService} service The service
   * @returns {void}
   */
  constructor(protected service: LanguageService) {
    super();
    this.state_subject.next("construct");
  }

  /**
   * Load model data
   * @return {Promise<Array<Language>>} promise The promise object.
   */
  load(): Promise<Array<Language>> {
    let promise = this.service.get();
    this.state_subject.next("loading");
    promise
      .then(data => {
        this.data = data as Language[];
        Logger.log(data);
        this.state_subject.next("load");
      })
      .catch(err => {
        this.state_subject.next("load_failed");
      });
    return promise;
  }

  /**
   * Init component
   * @return {void}
   */
  onInit(): void {
    this.load();
    this.state_subject.next("init");
  }
}
