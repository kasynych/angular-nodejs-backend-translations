import { Component } from "@angular/core";
import { Project } from "../common/project";

import { ListComponent } from "../common/list_component";
import { List } from "../common/list.interface";
import { ProjectService } from "./project.service";
import { Logger } from "common/logger";
@Component({
  selector: "projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.css"],
  providers: [ProjectService]
})
export /**
 * Projects Component class
 * @class
 * @extends ListComponent
 * @implements List
 */
class ProjectsComponent extends ListComponent implements List {
  /**
   * @property {Project[]} data - Component model
   */
  public data: Project[] = null;
  protected state_projects_observer = {
    next: x => {
      switch (x) {
        case "load":
          break;
        case "load_fail":
          break;
        case "delete":
      }
    }
  };

  /**
   * @constructs ProjectsComponent
   * @param {ProjectService} service
   * @returns {void}
   */
  constructor(protected service: ProjectService) {
    super();
    this.state_subject.subscribe(this.state_projects_observer);
    this.state_subject.next("construct");
  }

  /**
   * Loads component model
   * @returns {Promise<Array<Project>>}
   */
  load(): Promise<Array<Project>> {
    let promise = this.service.get();
    this.state_subject.next("loading");
    promise
      .then(data => {
        this.data = data as Project[];
        Logger.log(data);
        this.state_subject.next("load");
      })
      .catch(err => {
        this.state_subject.next("load_failed");
      });
    return promise;
  }

  /**
   * Init component
   * @returns {void}
   */
  onInit(): void {
    this.load();
    this.state_subject.next("init");
  }
}
