import { Component } from "@angular/core";

import { NavigationService } from "./navigation.service";
import { NavigationItem } from "../common/navigation_item";
import { ComponentBase } from "../common/component_base";
const $ = require("jQuery");

@Component({
  selector: "navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.css"],
  providers: [NavigationService]
})
export /**
 * NavigationComponent class
 * @class
 * @extends ComponentBase
 */
class NavigationComponent extends ComponentBase {
  /**
   * @property {Array<NavigationItem>} items - Navigation items
   */
  public items: Array<NavigationItem> = [];

  /**
   * @constructs NavigationComponent
   * @param service 
   * @returns {void}
   */
  constructor(protected service: NavigationService) {
    super();
  }

  /**
   * gets navigation items
   * @returns {Promise<Array<NavigationItems>>}
   */
  get(): Promise<Array<NavigationItem>> {
    return this.service.get();
  }

  /**
   * Init component
   * @returns {void}
   */
  onInit(): void {
    this.get().then(res => (this.items = res));
    $("#navigation").css("width", $(".sidebar").width() + "px");
  }
}
