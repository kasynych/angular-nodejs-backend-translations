import { Component, Input } from "@angular/core";

import { Translation } from "../common/translation";
import { ComponentBase } from "../common/component_base";
import { TranslationService } from "../translations/translation.service";
import { Data } from "../common/data";
const $ = require("jQuery");

@Component({
  selector: "translation-info",
  templateUrl: "./translation_info.component.html",
  styleUrls: ["./translation_info.component.css"],
  providers: [TranslationService]
})
export /**
 * Translation Info Component
 * @class
 * @extends ComponentBase
 */
class TranslationInfoComponent extends ComponentBase {
  /**
   * @property {Translation} data - Component model
   * @property {Array<Object>} misc -  misc data
   * @protected {Object} state_translation_info_observer - Observer
   */
  @Input() public data: Translation = null;
  public misc: Array<Object> = [];
  protected state_translation_info_observer = {
    next: x => {
      switch (x) {
        case "construct":
          break;
        case "display":
          break;
      }
    }
  };

  /**
   * @constructs TranslationInfoComponent
   * @param {TranslationService} service 
   * @returns {void}
   */
  constructor(protected service: TranslationService) {
    super();
    this.state_subject.subscribe(this.state_translation_info_observer);
    this.state_subject.next("construct");
  }

  /**
   * Walks misc attribute
   */
  walkMisc(): Array<Object> {
    this.misc = [];
    this.walkRecursive(this.data.misc);
    return this.misc;
  }

  /**
   * Walks recursively
   * @param {any} obj
   */
  walkRecursive(obj) {
    let i = 0;
    for (var key in obj) {
      if (obj[key].constructor == String) {
        if (key.constructor == String && ["uuid", "export"].indexOf(key) == -1)
          this.misc.push({
            key: key.replace(/_/g, " ").replace(key[0], key[0].toUpperCase()),
            value: obj[key]
          });
        i++;
      } else {
        i++;
        if (key.constructor == String)
          this.misc.push({
            key: key.replace(/_/g, " ").replace(key[0], key[0].toUpperCase()),
            value: ""
          });
        this.walkRecursive(obj[key]);
      }
    }
  }

  @Input() set translation(translation: Translation) {
    console.log(translation);
    this.data = translation;
    $("audio")[0].load();
  }
}
