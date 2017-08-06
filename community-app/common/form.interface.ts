/**
 * Form component interface
 * @interface
 */
export interface Form {
  /**
   * Load model data
   * @returns {Promise<Array<Language>>} promise The promise object.
   */
  load(id: number): Promise<any>;

  /**
   * Save form component model
   * @param {Event} e
   * @returns {void}
   */
  save(e: Event): void;

  /**
   * Init form component
   * @returns {void}
   */
  onInit(): void;

  /**
   * Navigate to list component
   * @returns {void}
   */
  goBack(): void;
}
