import { Component } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import "rxjs/add/operator/switchMap";

import { FormComponent } from "../common/form_component";
import { Form } from "../common/form.interface";
import { Language } from "../common/language";
import { LanguageService } from "./language.service";
import { Message } from "../common/message";
import { Logger } from "common/logger";

@Component({
  selector: "language",
  templateUrl: "./language_form.component.html",
  styleUrls: ["./language.component.css"],
  providers: [LanguageService]
})
export /**
 * Language Component class
 * @class
 * @extends FormComponent
 * @implements Form
 */
class LanguageComponent extends FormComponent implements Form {
  /**
   * @property {Language} data - Component model
   */
  public data: Language = new Language();

  /**
   * @constructs LanguageComponent
   * @param {LanguageService} service 
   * @param {Router} router 
   * @param {ActivatedRoute} route 
   * @returns {void}
   */
  constructor(
    protected service: LanguageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super("Language Form");
  }

  /**
   * Save component model
   * @param {Event} e
   * @returns {void}
   */
  save(e: Event): void {
    if (this.data.id != 0)
      this.service
        .put(this.data)
        .then(res => {
          this.subject.next(new Message("Language updated", "success"));
          this.goBack();
        })
        .catch(err => {
          this.subject.next(new Message("Error updating language", "error"));
        });
    else {
      this.data.id = Math.round(Math.random() * 1000000);
      this.service
        .post(this.data)
        .then(err => {
          this.subject.next(new Message("Language created", "success"));
          this.goBack();
        })
        .catch(res => {
          this.subject.next(new Message("Error creating language", "error"));
        });
    }
  }

  /**
   * Load component model
   * @param {number} id
   * @returns {Promise<Language>}
   */
  load(id: number): Promise<Language> {
    let promise = this.service.get(id);
    promise
      .then(res => {
        if (res.constructor == Error) throw Error;
        else if (typeof res.id != "undefined") this.data = res;
        Logger.log(this.data);
      })
      .catch(err => {
        Logger.log(err);
      });

    return promise;
  }

  /**
   * Init component
   * @returns {void}
   */
  onInit(): void {
    this.route.params
      .switchMap((params: Params) => this.service.get(+params["id"]))
      .subscribe(res => {
        if (res.constructor == Error) throw Error;
        else if (typeof res.id != "undefined") this.data = res as Language;

        Logger.log(this.data);
      });
  }

  /**
   * Navigate to list component
   * @returns {void}
   */
  goBack(): void {
    this.router.navigate(["/languages"]);
  }
}
