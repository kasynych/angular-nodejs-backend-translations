import { Component } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import "rxjs/add/operator/switchMap";

import { User } from "../common/user";
import { FormComponent } from "../common/form_component";
import { Form } from "../common/form.interface";
import { UserService } from "./user.service";
import { Message } from "../common/message";
import { Logger } from "common/logger";

@Component({
  selector: "user_form",
  templateUrl: "./user_form.component.html",
  styleUrls: ["./user_form.component.css"],
  providers: [UserService]
})
export /**
 * User Component class
 * @class
 * @extends FormComponent
 * @implements Form
 */
class UserComponent extends FormComponent implements Form {
  /**
   * @property {User} data -  Component model
   */
  public data: User = new User();

  /**
   * @constructs UserComponent
   * @param {UserService} service 
   * @param {Router} router 
   * @param {ActivatedRoute} route 
   */
  constructor(
    protected service: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super("User Form");
  }

  /**
   * Save Component model
   * @param {Event} e 
   * @returns {void}
   */
  save(e: Event): void {
    if (this.data.id != 0)
      this.service
        .put(this.data)
        .then(res => {
          this.subject.next(new Message("User updated", "success"));
          this.goBack();
        })
        .catch(err => {
          this.subject.next(new Message("Error updating user", "error"));
        });
    else {
      this.data.id = Math.round(Math.random() * 1000000);
      this.service
        .post(this.data)
        .then(err => {
          this.subject.next(new Message("User created", "success"));
          this.goBack();
        })
        .catch(res => {
          this.subject.next(new Message("Error creating user", "error"));
        });
    }
  }

  /**
   * Loads component model
   * @param {number} id 
   * @returns {Promise<User>}
   */
  load(id: number): Promise<User> {
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
        else if (typeof res.id != "undefined") this.data = res as User;

        Logger.log(this.data);
      });
  }

  /**
   * Route to list component
   * @returns {void}
   */
  goBack(): void {
    this.router.navigate(["/users"]);
  }
}
