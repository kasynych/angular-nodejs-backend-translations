import { TestBed, async } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ProjectComponent } from "./project.component";
import { ProjectService } from "./project.service";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDataService } from "../in-memory-data.service";
import { Data } from "common/data";
const $ = require("jQuery");
const wait_delay = 50;
describe("projectService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectComponent],
      imports: [
        HttpModule,
        // InMemoryWebApiModule.forRoot(InMemoryDataService),
        RouterTestingModule,
        FormsModule
      ]
    });
    TestBed.compileComponents();
  });

  // describe('get()', () => {
  //   it('get(1)',async( () => {
  //     const fixture = TestBed.createComponent(ProjectComponent);
  //     const project = fixture.debugElement.componentInstance;
  //     fixture.detectChanges();
  //     Data.testMode();
  //     project.service.get(1).then(res => {
  //       expect(Object.keys(res).length > 0).toBeTruthy();
  //     })
  //   }));

  //   it('get()',async( () => {
  //     const fixture = TestBed.createComponent(ProjectComponent);
  //     const project = fixture.debugElement.componentInstance;
  //     fixture.detectChanges();
  //     Data.testMode();
  //     project.service.get().then(res => {
  //       expect(res.length).toBeGreaterThan(0);
  //     })
  //   }))
  // });
});
