import { Injectable, NgModule } from "@angular/core";

import "rxjs/add/operator/toPromise";

import { NavigationItem } from "common/navigation_item";
import { ProjectService } from "projects/project.service";
import { CrudService } from "common/crud_service";
import { Project } from "common/project";
import { Logger } from "common/logger";
import { Data } from "common/data";
import { Language } from "common/language";

@NgModule({
  imports: [ProjectService],
  providers: [ProjectService]
})
@Injectable()
export /**
 * Navigation Service class
 * @class
 * @extends ServiceHttp
 */
class NavigationService extends CrudService {
  /**
   * @private {Array<NavigationItem>} items - Navigation items
   */
  private items: Array<NavigationItem> = [];

  /**
   * Gets navigation items
   * @returns {Promise<Array<NavigationItem>>}
   */
  get(): Promise<Array<NavigationItem>> {
    this.url = this.getApiUrl() + "/api/projects";
    let ret = new Promise<any>(() => {});
    if (!Data.account.isLoaded()) {
      setTimeout(function() {
        if (!Data.account.isLoaded())
          return new Promise<any>((resolve, reject) => {
            reject("Account not loaded");
          });
        else ret = this.get();
      }, 500);
      return ret;
    } else {
      switch (Data.account.role.toLowerCase()) {
        case "super admin":
        // break;
        case "admin":
          this.items = [
            {
              title: "Projects",
              href: "/projects",
              subitems: [],
              css_class: "projects_li"
            },
            {
              title: "Languages",
              href: "/languages",
              subitems: [],
              css_class: "languages_li"
            },
            {
              title: "Collaborators",
              href: "/users",
              subitems: [],
              css_class: "collaborators_li"
            },
            {
              title: "Promo Codes",
              href: "/promo-codes",
              subitems: [],
              css_class: "promo_codes_li"
            }
          ];
          for (let i in Data.account.projects) {
            let project = Data.account.projects[i];
            this.items[0].subitems.push({
              title: project.project_name,
              href: "/projects/project/" + project.id,
              subitems: [],
              css_class: "project_li"
            });
          }
          break;
        case "moderator":
          this.items = [
            {
              title: "Comments Approval",
              href: "/moderation/comments",
              subitems: [],
              css_class: "comment_approval_li"
            },
            {
              title: "Image Approval",
              href: "/moderation/images",
              subitems: [],
              css_class: "image_approval_li"
            },
            {
              title: "Audio Approval",
              href: "/moderation/audio",
              subitems: [],
              css_class: "audio_approval_li"
            }
          ];
          break;
        case "developer":
          break;
        case "designer":
          this.items = [];
          let language_id = 0;
          for (let i in Data.account.languages) {
            if (Data.account.languages[i].name.toLowerCase() == "english") {
              language_id = Data.account.languages[i].id;
              break;
            }
          }
          for (let i in Data.account.projects) {
            let project = Data.account.projects[i];
            let item = new NavigationItem(
              project.project_name,
              "translations/images/project/" +
                project.id +
                "/language/" +
                language_id,
              [],
              "translation_images_project_li"
            );
            this.items.push(item);
          }
          break;
        case "audio editor":
          this.items = [];
          for (let i in Data.account.projects) {
            let project = Data.account.projects[i];
            let item = new NavigationItem(project.project_name, "", [], "");
            for (let j in Data.account.languages) {
              let language = Data.account.languages[j];
              item.subitems.push(
                new NavigationItem(
                  language.name,
                  "translations/audio/project/" +
                    project.id +
                    "/language/" +
                    language.id,
                  [],
                  "translation_audio_language_li"
                )
              );
            }
            this.items.push(item);
          }
          break;
        case "translator":
          this.items = [];
          for (let i in Data.account.projects) {
            let project = Data.account.projects[i];
            let item = new NavigationItem(project.project_name, "", [], "");
            for (let j in Data.account.languages) {
              let language = Data.account.languages[j];
              item.subitems.push(
                new NavigationItem(
                  language.name,
                  "/translations/project/" +
                    project.id +
                    "/language/" +
                    language.id,
                  [],
                  "translation_language_li"
                )
              );
            }
            this.items.push(item);
          }
          break;
        case "contributor":
          break;
        case "player":
          break;
        case "proPlayer":
          break;
        case "guest":
          break;
        default:
          return;
      }

      this.items.push({
        title: "Logout",
        href: "/logout",
        subitems: [],
        css_class: "logout_li"
      });
      return new Promise<any>((resolve, reject) => resolve(this.items));
    }
  }
}
