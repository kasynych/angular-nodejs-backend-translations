/* tslint:disable:no-unused-variable */

import { NO_ERRORS_SCHEMA } from "@angular/core";
import { TestBed, async } from "@angular/core/testing";
import { CommentsComponent } from "./comments.component";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpModule } from "@angular/http";
// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDataService } from "../in-memory-data.service";

// describe("CommentsComponent", () => {
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [CommentsComponent],
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
//       const fixture = TestBed.createComponent(CommentsComponent);
//       const c = fixture.debugElement.componentInstance;
//       expect(c).toBeTruthy();
//     })
//   );
// });
