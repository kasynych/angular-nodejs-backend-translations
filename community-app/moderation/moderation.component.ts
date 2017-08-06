import { Component } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

import { ComponentBase } from "common/component_base";
import { Project } from "common/project";
import { Data } from "common/data";
import { Language } from "common/language";
import { ModerationFilter } from "moderation/filter";
const $ = require('jQuery');

@Component({
  selector: "moderation",
  templateUrl: "./moderation.component.html",
  styleUrls: ["./moderation.component.css"]
})
export /**
 * Moderation Component class
 * @class
 * @extends ComponentBase
 */
  class ModerationComponent extends ComponentBase {

  /**
   * @property {any} data                  - Component model
   * @property {Project[]} user_projects   - User projects
   * @property {Language[]} user_languages - User languages
   * @property {string} moderation_object  - Moderation object
   * @property {ModerationFilter} filter   - filter
   */
  public data: any = null;
  public user_projects: Project[] = null;
  public user_languages: Language[] = null;
  public moderation_object: string = null;
  public filter: ModerationFilter = new ModerationFilter();

  /**
   * @construts Moderation Component
   * @param {ActiveRoute} route 
   * @returns {void}
   */
  constructor(private route: ActivatedRoute) {
    super();
    this.user_projects = Data.account.projects;
    this.user_languages = Data.account.languages;
  }

  /**
   * Init component
   * @returns {void}
   */
  onInit() {
    this.route.params
      .subscribe((params: Params) => {
        if (params['moderation_object'] !== 'audio' && params['moderation_object'] != 'images' && params['moderation_object'] != 'comments' && params['moderation_object'] != 'translations')
          throw new Error('Wrong params');
        if (typeof params['moderation_object'] != 'undefined')
          this.moderation_object = params['moderation_object'];
      });
  }
}
