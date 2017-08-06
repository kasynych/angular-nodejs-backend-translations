/**
 * Message class
 * @class
 */
export class Message {
  /**
   * @property {string} text     - Message text
   * @property {string} severity -  Message severity
   */
  public text: string = null;
  public severity: string = "success";

  /**
   * @constructs Message
   * @param {string} text
   * @param {string} severity
   * @returns {void}
   */
  constructor(text: string = null, severity: string = "success") {
    this.text = text;
    this.severity = severity;
  }
}
