import { Base } from "./base";
import { Data } from "common/data";
/**
 * Service base class
 * @class
 * @abstract
 * @extends Base
 */
export abstract class ServiceBase extends Base {
  constructor() {
    super();
  }

  public getApiUrl(): string {
    if (
      (Data.environment == "dev" || Data.environment == "test") &&
      Data.in_memory_db_set == false
    )
      return "http://localhost:3000";
    else return "";
  }
}
