import { TestBed, async } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { LanguageComponent } from "./language.component";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDataService } from "../in-memory-data.service";
import { Data } from "../common/data";
const $ = require("jQuery");
const wait_delay = 1000;
describe("LanguageComponent", () => {
  // beforeEach(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [
  //       LanguageComponent
  //     ],
  //     imports: [
  //       HttpModule,
  //       // InMemoryWebApiModule.forRoot(InMemoryDataService),
  //       RouterTestingModule,
  //       FormsModule
  //     ]
  //   });
  //   TestBed.compileComponents();
  // });
  // describe('get()', () => {
  //   it('get language',async( () => {
  //     const fixture = TestBed.createComponent(LanguageComponent);
  //     const language = fixture.debugElement.componentInstance;
  //     Data.testMode();
  //     language.load(1)
  //     .then(res => {
  //     setTimeout(function(){
  //       fixture.detectChanges();
  //       const compiled = fixture.debugElement.nativeElement;
  //       expect($('#name').val()).toMatch(/.+/);
  //     },wait_delay);
  //     });
  //   }))
  // });
});
