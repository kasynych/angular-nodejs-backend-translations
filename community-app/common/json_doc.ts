import { JsonObject } from "./json_object";
/**
 * JSON Doc Class
 * @class
 * @abstract
 * @extends JsonObject
 */
export abstract class JsonDoc extends JsonObject {
  /**
   * @property {string} _id - Json Doc id
   * @property {number} id  - Autoincrement id
   */
  public _id: string = "";
  public id: number = 0;

  /**
   * @constructs JsonDoc
   * @param {Object} obj - an object
   */
  constructor(obj?) {
    super(obj);
    if (typeof obj != "undefined" && obj != null) {
      if (typeof obj._id != "undefined") this._id = obj._id;
      if (typeof obj.id != "undefined") this.id = obj.id;
    }
  }
}
