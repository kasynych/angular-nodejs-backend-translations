import { OnInit, Input } from "@angular/core";
import { Subject } from "rxjs/Subject";

import { Base } from "./base";
import { ServiceBase } from "./service_base";
import { Data } from "../common/data";

/**
 * Component base class
 * @class
 * @abstract
 * @extends Base
 * @implements OnInit
 */
export abstract class ComponentBase extends Base implements OnInit {
  /**
   * @protected {ServiceBase} service           - Component services
   * @protected {Subject<any>} subject          - Component subject observable
   * @protected {Subject<string>} state_subject - Component state subject observable
   * @protected {Object} state_observer         - Observes component state
   * @protected {any} data                      - Component model
   */
  protected service: ServiceBase;
  protected subject: Subject<any>;
  protected state_subject: Subject<string>;
  protected state: string;
  protected data: any;
  state_observer = {
    next: x => {
      this.setState(x);
      switch (x) {
        case "loading":
          if (typeof this.data != "undefined" && this.data !== null) {
            if (this.data.constructor == Array) this.data = [];
            else this.data = null;
          }
          break;
        case "load":
        case "load_fail":
          break;
      }
    }
  };

  /**
   * @constructs BaseComponent
   * @returns {void}
   */
  constructor() {
    super();
    this.subject = new Subject();
    this.subject.subscribe(Data.observer);
    this.state_subject = new Subject();
    this.state_subject.subscribe(this.state_observer);
  }

  /**
   * Inits component
   * @returns {void}
   */
  ngOnInit(): void {
    this.onInit();
    //    this.message.reset();
  }

  /**
   * Inits component
   * @returns {void}
   */
  onInit(): void {}

  /**
   * Handles errors
   * @param {any} error
   * @returns {Promise}
   */
  handleError(error: any) {
    console.log(error.toString());
    return Promise.reject(error.message || error);
  }

  setState(state: string): void {
    this.state = state;
  }

  getState(): string {
    return this.state;
  }
}
