import { Response } from "./response";

import { ServiceHttp } from "./service_http";

/**
 * CRUD Service class
 * @class
 * @abstract
 * @extends ServiceHttp
 */
export abstract class CrudService extends ServiceHttp {
  /**
   * Http.get() layer
   * @param {number} id
   * @param {number} page
   * @returns {Promise<any>}
   */
  get(id: number = null,page: number = 1): Promise<any> {
    let url = id == null ? this.url : this.url + "/" + id;
    if(page != null) url += '?page='+page;
    return this.http
      .get(url, { headers: this.headers })
      .toPromise()
      .then(response => response.json().data)
      .catch(error => error);
  }

  /**
   * Http.put() layer
   * @param {Object} obj
   * @returns {Promise<any>}
   */
  put(obj: any): Promise<Response> {
    const url = `${this.url}/${obj.id}`;
    return this.http
      .put(url, JSON.stringify(obj), { headers: this.headers })
      .toPromise()
      .then(() => obj)
      .catch(this.handleError);
  }

  /**
   * Http.post() layer
   * @param {Object} obj 
   * @returns {Promise<any>}
   */
  post(obj: any): Promise<Response> {
    return this.http
      .post(this.url, JSON.stringify(obj), { headers: this.headers })
      .toPromise()
      .then(() => obj)
      .catch(this.handleError);
  }

  /**
   * Http.delete() layer
   * @param {number[]}ids
   * @returns Promise<Response>
   */
  delete(ids: number[]): Promise<Response> {
    const url = this.url + "/" + ids.join(",");
    return this.http
      .delete(url)
      .toPromise()
      .then(res => res.json())
      .catch(err => {
        console.log(err);
        this.handleError;
      });
  }
}
