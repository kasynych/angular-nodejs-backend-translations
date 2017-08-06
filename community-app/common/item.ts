import { JsonDoc } from "./json_doc";
import { Translation } from "./translation";
import { Project } from "./project";

/**
 * Item class
 * @class
 * @ectends JsonDoc
 */
export class Item extends JsonDoc {
  /**
   * @property {Project} project - Project item belogs to
   * @property {Translation[]} translations - Item translations
   * @property {string} image
   * @property {sting} topic
   * @property {string} subtopic
   */
  public project: Project;
  public translations: Translation[];
  public image: string = "";
  public topic: string;
  public subtopic: string;
}
