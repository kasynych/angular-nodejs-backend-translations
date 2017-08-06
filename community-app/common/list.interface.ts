/**
 * List component interface
 * @interface
 */
export interface List {
  /**
   * Load model data
   * @param {any} arg1
   * @param {any} arg2
   * @returns {Promise<any>} promise The promise object.
   */
  load(arg1?: any, arg2?: any): Promise<Array<any>>;

  /**
   * Init component
   * @returns {void}
   */
  onInit(): void;
}
