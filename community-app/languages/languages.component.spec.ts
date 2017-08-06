import { TestBed, async } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { LanguagesComponent } from "./languages.component";
import { HttpModule } from "@angular/http";
// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDataService } from "../in-memory-data.service";
import { Data } from "common/data";
const wait_delay = 500;
describe("LanguagesComponent", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LanguagesComponent],
      imports: [
        HttpModule,
        // InMemoryWebApiModule.forRoot(InMemoryDataService),
        RouterTestingModule
      ]
    });
    TestBed.compileComponents();
  });

  // describe("load()", () => {
  //   it(
  //     "list languages",
  //     async(() => {
  //       const fixture = TestBed.createComponent(LanguagesComponent);
  //       const languages = fixture.debugElement.componentInstance;
  //       fixture.detectChanges();
  //       Data.testMode();
  //       languages.load().then(res => {
  //         fixture.detectChanges();
  //         const compiled = fixture.debugElement.nativeElement;
  //         expect(
  //           compiled.querySelectorAll("#languages tbody tr").length
  //         ).toBeGreaterThan(0);
  //       });
  //       // setTimeout(function(){
  //       //   fixture.detectChanges();
  //       //   const compiled = fixture.debugElement.nativeElement;
  //       //   expect(compiled.querySelectorAll('#users tbody tr').length).toBeGreaterThan(0);
  //       // },wait_delay)
  //     })
  //   );
  // });
});
