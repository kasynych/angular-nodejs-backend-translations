import { Component } from "@angular/core";

import { User } from "../common/user";
import { UserService } from "./user.service";
import { ListComponent } from "../common/list_component";
import { List } from "../common/list.interface";
import { Logger } from "common/logger";

@Component({
  selector: "users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
  providers: [UserService]
})
export /**
 * Users Component class
 * @class
 * @extends ListComponent
 * @implements List
 */
class UsersComponent extends ListComponent implements List {
  /**
   * @property {User[]} data - Component Model
   */
  public data: User[] = null;

  /**
   * @constructs UsersComponent
   * @param {UserService} service 
   * @returns {void}
   */
  constructor(protected service: UserService) {
    super();
    this.state_subject.next("construct");
  }

  /**
   * Loads Component model
   * @returns {Promise<User[]>}
   */
  load(): Promise<Array<User>> {
    let promise = this.service.get();
    this.state_subject.next("loading");
    promise
      .then(data => {
        this.data = data as User[];
        Logger.log(data);
        this.state_subject.next("load");
      })
      .catch(err => this.state_subject.next("load_failed"));
    return promise;
  }

  /**
   * Init Component
   * @returns {void}
   */
  onInit(): void {
    this.load().then(res => {
      this.state_subject.next("init");
    });
  }
}
