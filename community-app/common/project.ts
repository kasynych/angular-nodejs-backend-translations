import { JsonDoc } from "./json_doc";

/**
 * Project Doc class
 * @class
 * @extends JsonDoc
 */
export class Project extends JsonDoc {
  /**
   * @property {string} project_name - Project name
   * @property {string} platform     - Project platform
   */
  public project_name: string;
  public platform: string;
}
