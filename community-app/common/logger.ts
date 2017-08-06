import { Data } from "./data";

/**
 * Logger class
 * @abstract
 */
export abstract class Logger {
  /**
   * @static {any} log_types      - Allowed log types
   */

  static log_types: any = "all";

  /**
   * Logs to console
   * @param {any} log
   * @returns {void}
   */
  static log(log: any): void {
    if (Data.environment == "dev") {
      if (Logger.log_types == "all") {
        console.log(log);
        return;
      }
    }
  }
}
