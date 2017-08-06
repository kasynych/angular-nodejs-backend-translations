/* tslint:disable:no-unused-variable */

import { NO_ERRORS_SCHEMA } from "@angular/core";
import { TestBed, async } from "@angular/core/testing";
import { TranslationsComponent } from "./translations.component";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpModule } from "@angular/http";
// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDataService } from "../in-memory-data.service";
import { Data } from "../common/data";
import { Language } from "../common/language";
import { Project } from "../common/project";
import { User } from "../common/user";
import { Translation } from "../common/translation";

const $ = require("jQuery");

const wait_delay = 150;

// describe('TranslationsComponent', () => {
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         TranslationsComponent
//       ],
//       imports: [
//         HttpModule,
//         // InMemoryWebApiModule.forRoot(InMemoryDataService),
//         RouterTestingModule
//       ],
//       schemas: [NO_ERRORS_SCHEMA]
//     });
//     TestBed.compileComponents();
//   });

//   it('should create the component', async(() => {
//     const fixture = TestBed.createComponent(TranslationsComponent);
//     const translations = fixture.debugElement.componentInstance;
//     expect(translations).toBeTruthy();
//   }));

//   describe('load()', () => {
//     it('list translations',async( () => {
//       const fixture = TestBed.createComponent(TranslationsComponent);
//       const translations = fixture.debugElement.componentInstance;
//       Data.testMode();
//       let project_id = 1;
//       let language_id = 3;

//       setTimeout(function(){
//         translations.load(project_id,language_id)
//         .then(res =>{
//             setTimeout(function(){
//             const compiled = fixture.debugElement.nativeElement;
//             expect(res.length).toBeGreaterThan(0);
//           },wait_delay)
//         });
//       },wait_delay);

//     }))
//   });

//   describe('save()', () => {
//     it('add translation', async ( () => {
//       const fixture = TestBed.createComponent(TranslationsComponent);
//       const translations = fixture.debugElement.componentInstance;
//       Data.testMode();
//       let t = {_id:'z4w23nylqm3v0r1o2hloffup',audio:"",id:8,project:new Project(),project_id:1,language_id:1,status:"New",language: new Language(), uuid: 'blabla', user: new User(), english:"Phrase8_eng", text:'Phrase8_lang8', media_id: 8, created:'2017-07-10 12:12:12',updated:'2017-07-10 14:14:14', comments:[]} as Translation
//     }));
//   });
// });
