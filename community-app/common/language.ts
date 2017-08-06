import { JsonDoc } from "./json_doc";

/**
 * Language Doc class
 * @class
 * @extends JsonDoc
 */
export class Language extends JsonDoc {
  /**
   * @property {number} language_number - Language number
   * @property {string} code            - Language code
   * @property {string} name            - Language name
   * @property {string} nativeName      - Language native name
   */
  public language_number: number;
  public code: string;
  public name: string = "";
  public nativeName: string = "";
}
