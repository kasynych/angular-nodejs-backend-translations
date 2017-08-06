import { Component } from "@angular/core";

import { ComponentBase } from "../common/component_base";
import { Data } from "../common/data";
import { Message } from "../common/message";
import { Account } from "../common/account";
import { DashboardService } from "./dashboard.service";

@Component({
  selector: "dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
  providers: [DashboardService]
})
export /**
 * Dashboard Component class
 * @class
 * @extends ComponentBase
 */
class DashboardComponent extends ComponentBase {
  /**
   * @property {Account} account - account object
   * @property {any} data - component model
   * @property {Array<string>} header_css_classes - sections CSS classes
   */
  public account: Account = null;
  public data: any = null;
  public header_css_classes: Array<string> = [
    "bg-drank",
    "bg-cyan",
    "bg-hotpink",
    "bg-amethyst",
    "bg-warning",
    "bg-danger",
    "bg-blush"
  ];

  /**
   * @constructs DashboardComponent
   * @param { DashboardService } service
   * @returns {void}
   */
  constructor(protected service: DashboardService) {
    super();
    this.state_subject.next("construct");
  }

  /**
   * Loads component model
   * @returns {Promise<any>}
   */
  load(): Promise<any> {
    this.state_subject.next("loading");
    return this.service
      .get()
      .then(res => {
        this.data = res;
        console.log("Dashboard->", this.data);
        this.state_subject.next("load");
      })
      .catch(err => this.state_subject.next("load_failed"));
  }

  /**
   * Init component
   * @returns {void}
   */
  onInit(): void {
    let obj = this;
    let int = setInterval(function() {
      if (typeof Data.account != "undefined") {
        clearInterval(int);
        obj.account = Data.account;
        obj.load();
      }
    }, 30);
  }
}
