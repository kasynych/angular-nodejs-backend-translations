import { Injectable } from "@angular/core";
import { Headers } from "@angular/http";
import { Http } from "@angular/http";
import { ServiceBase } from "./service_base";
import { Data } from "common/data";

@Injectable()
export abstract class /**
 * HTTP Service class
 * @class
 * @abstract
 * @extends ServiceBase
 */
ServiceHttp extends ServiceBase {
  /**
   * @protected {Headers} headers - JSON HTTP request headers
   * @protected {string} url      - Request end point URL
   */
  protected headers = new Headers({ "Content-Type": "application/json" });
  protected url: string;

  /**
   * @constructs ServiceBase
   * @param {Http} http 
   * @returns {void}
   */
  constructor(protected http: Http) {
    super();
  }

  /**
   * Handles HTTP errors
   * @param {any} error 
   * @returns {Promise}
   */
  protected handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

  public setDevUrl(): void {
    this.url =
      this.getApiUrl() + (this.url.indexOf("/") != 0 ? "/" : "") + this.url;
  }

  public getUrl(): string {
    return this.url;
  }
}
