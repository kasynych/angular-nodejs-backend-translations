import { CrudService } from "./crud_service";
const $ = require("jQuery");

import { ComponentBase } from "./component_base";
import { Message } from "../common/message";

/**
 * List Componetn Class
 * @class 
 * @abstract
 * @extends ComponentBase
 */
export abstract class ListComponent extends ComponentBase {
  /**
   * @protected {CrudService} service        - Service
   * @protected {Object} pagination          - Component pagination
   * @protected {number} pagination.page     - Current page
   * @protected {number[]} pagination.pages  -  Array of all page numbers, used for *ngFor
   * @protected {Object} state_list_observer - Observes list component state, overrides state_observer
   */
  protected service: CrudService;
  protected pagination = {
    page: 1,
    pages: [1]
  };
  protected state_list_observer = {
    next: x => {
      switch (x) {
        case "load_empty":
          if(this.pagination.page > 1) this.pagination.page -= 1;
        case "load":
        case "load_fail":
          $(".list #check_all_checkbox").prop("checked", false);
          if ($(".fa-refresh.fa-spin").length > 0)
            $(".fa-refresh").removeClass("fa-spin");
          break;
      }
    }
  };

  /**
   * @constructs ListComponent
   * @returns {void}
   */
  constructor() {
    super();
    this.state_subject.subscribe(this.state_list_observer);
  }

  /**
   * Loads page
   * @param {number} page
   * @returns {void}
   */
  loadPage(page: number): void {
    this.pagination.page = page;
    this.load();
  }

  /**
   * Updates pagination output
   * @param {number} total_pages
   * @returns {void}
   */
  updatePagination(total_pages: number): void {
    // $(".pagination li").removeClass("active");
    // $(".pagination li").eq(this.pagination.page - 1).addClass("active");
    this.pagination.pages = [];
    for (var i = 1; i <= total_pages; i++) this.pagination.pages.push(i);
  }

  /**
   * Loads page #1
   * @returns {void}
   */
  refresh(): void {
    if ($(".fa-refresh").length > 0) $(".fa-refresh").addClass("fa-spin");
    this.loadPage(1);
  }

  /**
   * Loads component model
   * @param {any} arg1
   * @param {any} arg2
   * @returns {void}
   */
  load(arg1?: any, arg2?: any): void {}

  /**
   * Toggles list checkboxes
   * @returns {void}
   */
  checkAll(): void {
    if (
      $(".list input:checkbox").length >
      $(".list input:checkbox:checked").length
    ) {
      if ($(".list #check_all_checkbox").is(":checked"))
        $(".list input:checkbox").prop("checked", true);
      else $(".list input:checkbox").prop("checked", false);
    } else if (!$(".list #check_all_checkbox").is(":checked"))
      $(".list input:checkbox").prop("checked", false);
  }

  /**
   * Bulk delete click event handler
   * @param {Event} e
   * @returns {void}
   */
  bulkDelete(e: Event): void {
    var ids = $(".list tbody input:checkbox:checked")
      .map(function() {
        return Number($(this).val());
      })
      .get();

    if (ids.length > 0) {
      this.delete(ids);
    }
  }

  /**
   * Deletes list items
   * @param {number[]} ids 
   */
  delete(ids: number[]): void {
    if (!confirm("Are you sure?")) return;
    this.service
      .delete(ids)
      .then(response => {
        this.subject.next(new Message("Deleted", "success"));
        this.state_subject.next("delete");
        this.load();
      })
      .catch(this.handleError);
  }

  /**
   * Init component
   * @return {void}
   */
  onInit(): void {
    this.load();
    $(".list #check_all_checkbox").prop("checked", false);
  }
}
