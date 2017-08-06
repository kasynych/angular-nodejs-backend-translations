/* tslint:disable:no-unused-variable */

import { NO_ERRORS_SCHEMA } from "@angular/core";
import { TestBed, async } from "@angular/core/testing";
import { DashboardComponent } from "./dashboard.component";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpModule } from "@angular/http";
// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDataService } from "../in-memory-data.service";
import { Data } from "common/data";
const wait_delay = 500;

// describe("DashboardComponent", () => {
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [DashboardComponent],
//       imports: [
//         HttpModule,
//         // InMemoryWebApiModule.forRoot(InMemoryDataService),
//         RouterTestingModule
//       ],
//       schemas: [NO_ERRORS_SCHEMA]
//     });
//     TestBed.compileComponents();
//   });

//   it(
//     "should create the dashboard",
//     async(() => {
//       const fixture = TestBed.createComponent(DashboardComponent);
//       const dashboard = fixture.debugElement.componentInstance;
//       Data.testMode();
//       expect(dashboard).toBeTruthy();
//     })
//   );
// });
