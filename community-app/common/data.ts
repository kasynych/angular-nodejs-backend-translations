import { Subject } from "rxjs/Subject";

import { Message } from "./message";
import { Account } from "./account";
import { Logger } from "./logger";

/**
 * Data class, for common purposes
 * @class
 * @abstract
 */
export abstract class Data {
  /**
   * @static {Message} message      - Message object
   * @static {Subject<any>} subject - Subject observable
   * @static {string} environment   - Environment
   * @static {string} test_role     - Test role
   * @static {Object} observer      - Observer
   * @static {Account} account      - account object
   */
  static message: Message = new Message();
  static subject: Subject<any> = new Subject();
  static environment: string = "dev";
  static in_memory_db_set: boolean = false;
  static test_role = "Translator";
  static observer = {
    next: x => {
      if (x instanceof Message) {
        Data.subject.next((Data.message = x));
      } else console.log(x);
    }
  };
  static account: Account;

  /**
   * Sets test mode
   * @returns {void}
   */
  static testMode(): void {
    Data.environment = "test";
  }

  /**
   * Generated Json Doc _id string
   * @returns {string}
   */
  static generate__id(): string {
    let rand: number = 0;
    let ret: string = "";
    let letter: boolean = true;
    for (let i = 0; i < 24; i++) {
      letter = Math.round(Math.random()) == 1;
      if (letter) rand = Math.round(Math.random() * 25) + 97;
      else rand = Math.round(Math.random() * 9) + 48;

      ret += String.fromCharCode(rand);
    }
    return ret;
  }

  /**
   * Get query param value by param name
   * @param {string} name - query param name
   * @returns {string} - param value
   */
  static getParameterByName(name: string): string {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  }
}

if (Data.environment == "dev") {
  if (Data.getParameterByName("role") != "")
    Data.test_role = Data.getParameterByName("role").replace(/_/g, " ");

  Data.account = new Account(null, Data.test_role);
}

setTimeout(function() {
  Logger.log(Data.account);
}, 500);
