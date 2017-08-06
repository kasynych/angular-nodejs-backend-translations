import { TestBed, async } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ProjectComponent } from "./project.component";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDataService } from "../in-memory-data.service";
import { Data } from "../common/data";
const $ = require("jQuery");
const wait_delay = 50;
// describe('ProjectComponent',() => {
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         ProjectComponent
//       ],
//       imports: [
//         HttpModule,
//         // InMemoryWebApiModule.forRoot(InMemoryDataService),
//         RouterTestingModule,
//         FormsModule
//       ]
//     });
//     TestBed.compileComponents();
//   });

//   describe('get()', () => {
//     it('get project',async( () => {
//       const fixture = TestBed.createComponent(ProjectComponent);
//       const project = fixture.debugElement.componentInstance;
//       fixture.detectChanges();
//       Data.testMode();
//       project.load(1)
//       .then(res => {
//         console.log(res);
//       setTimeout(function(){
//         fixture.detectChanges();
//         const compiled = fixture.debugElement.nativeElement;
//         expect($('#project_name').val()).toMatch(/.+/);
//       },wait_delay);
//       });
//     }))
//   });
// })
