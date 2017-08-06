import { Component } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import "rxjs/add/operator/switchMap";

import { FormComponent } from "../common/form_component";
import { Form } from "../common/form.interface";
import { ProjectService } from "./project.service";
import { Message } from "../common/message";
import { Project } from "../common/project";
import { Logger } from "common/logger";

@Component({
  selector: "project",
  templateUrl: "./project.component.html",
  styleUrls: ["./project.component.css"],
  providers: [ProjectService]
})
export /**
 * Project Component class
 * @class
 * @extends FormComponent
 * @implements Form
 */
class ProjectComponent extends FormComponent implements Form {
  /**
   * @property {Project} data - Component model
   */
  public data: Project = new Project();

  /**
   * @constructs ProjectComponent
   * @param service 
   * @param router 
   * @param route 
   * @returns {void}
   */
  constructor(
    protected service: ProjectService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super("Project Form");
  }

  /**
   * Saves component model
   * @param {Event} e 
   * @returns {void}
   */
  save(e: Event): void {
    console.log(this.data);
    if (this.data.id != 0)
      this.service
        .put(this.data)
        .then(res => {
          this.subject.next(new Message("Project updated", "success"));
          this.goBack();
        })
        .catch(err => {
          this.subject.next(new Message("Error updating project", "error"));
        });
    else {
      this.data.id = Math.round(Math.random() * 1000000);
      this.service
        .post(this.data)
        .then(err => {
          this.subject.next(new Message("Project created", "success"));
          this.goBack();
        })
        .catch(res => {
          this.subject.next(new Message("Error creating project", "error"));
        });
    }
  }

  /**
   * Loads component model
   * @param {number} id
   * @returns {Promise<Project>}
   */
  load(id: number): Promise<Project> {
    let promise = this.service.get(id);
    promise
      .then(res => {
        if (res.constructor == Error) throw Error;
        else if (typeof res.id != "undefined") this.data = res;
        Logger.log(this.data);
      })
      .catch(err => {
        Logger.log(err);
      });

    return promise;
  }

  /**
   * Init component
   * @returns {void}
   */
  onInit(): void {
    this.route.params
      .switchMap((params: Params) => this.service.get(+params["id"]))
      .subscribe(res => {
        if (res.constructor == Error) throw Error;
        else if (typeof res.id != "undefined") this.data = res as Project;
        Logger.log(this.data);
      });
  }

  /**
   * Navigate to list component
   * @returns {void}
   */
  goBack(): void {
    this.router.navigate(["/projects"]);
  }
}
