import { TestBed, async } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ProjectsComponent } from "./projects.component";
import { HttpModule } from "@angular/http";
// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDataService } from "../in-memory-data.service";
import { Data } from "common/data";
const wait_delay = 500;
// describe('ProjectsComponent',() => {
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         ProjectsComponent
//       ],
//       imports: [
//         HttpModule,
//         // InMemoryWebApiModule.forRoot(InMemoryDataService),
//         RouterTestingModule
//       ]
//     });
//     TestBed.compileComponents();
//   });

//   describe('load()', () => {
//     it('list projects',async( () => {
//       const fixture = TestBed.createComponent(ProjectsComponent);
//       const projects = fixture.debugElement.componentInstance;
//       fixture.detectChanges();
//       Data.testMode();
//       projects.load()
//       .then(res =>{
//         fixture.detectChanges();
//         const compiled = fixture.debugElement.nativeElement;
//         expect(compiled.querySelectorAll('#projects tbody tr').length).toBeGreaterThan(0);
//       });
//       // setTimeout(function(){
//       //   fixture.detectChanges();
//       //   const compiled = fixture.debugElement.nativeElement;
//       //   expect(compiled.querySelectorAll('#users tbody tr').length).toBeGreaterThan(0);
//       // },wait_delay)
//     }))
//   });
// })
