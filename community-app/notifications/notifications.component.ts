import { Component } from "@angular/core";

import { ComponentBase } from "../common/component_base";
import { Message } from "../common/message";
import { Data } from "../common/data";
@Component({
  selector: "notifications",
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.css"]
})
export /**
 * NotificationsComponent class
 * @class
 * @extends ComponentBase
 */
class NotificationsComponent extends ComponentBase {
  /**
   * @property {Message} message - Message instance
   * @private {Object} observer - Data subject observer
   */
  public message: Message = new Message();
  private observer = {
    next: x => {
      if (x instanceof Message) this.message = x;
    }
  };

  /**
   * Init component
   * @returns {void}
   */
  onInit(): void {
    Data.subject.subscribe(this.observer);
  }

  /**
   * Defines message CSS class
   * @returns {string}
   */
  messageCSSClass(): string {
    let obj = this;
    if (this.message == null) return "";
    switch (this.message.severity) {
      case "success":
        setTimeout(function() {
          obj.subject.next(new Message());
        }, 3500);
        return "card-success fade-out";
      case "info":
        setTimeout(function() {
          obj.subject.next(new Message());
        }, 3500);
        return "card-primary fade-out";
      case "error":
        setTimeout(function() {
          obj.subject.next(new Message());
        }, 3500);
        return "card-danger fade-out";
      default:
        return "";
    }
  }
}
