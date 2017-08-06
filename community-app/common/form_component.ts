import { ComponentBase } from "./component_base";

/**
 * Form component class
 * @class
 * @abstract
 * @extends ComponentBase
 */
export abstract class FormComponent extends ComponentBase {
  /**
     * @protected {string} form_title - Form title
     */
  protected form_title: string;
  protected data: any;

  constructor(form_title: string = "") {
    super();
    this.form_title = form_title;
  }

  editMode(): boolean {
    return this.data.id != 0;
  }
}
