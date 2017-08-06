const uuidv1 = require("uuid/v1");

/**
 * Json Object
 * @class
 * @abstract
 */
export abstract class JsonObject {
  /**
   * property {string} uuid - Unique Object ID
   */
  public uuid: string = uuidv1();

  /**
   * @constructs JsonObject
   * @returns {void}
   */
  constructor(obj?) {
    if (typeof obj != "undefined" && obj != null) {
      if (typeof obj.uuid != "undefined" && obj.uuid != "")
        this.uuid = obj.uuid;
      // else this.uuid = uuid();
    }
  }
}
