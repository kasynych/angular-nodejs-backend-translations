import { TestBed, async } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { UserComponent } from "./user.component";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDataService } from "../in-memory-data.service";
import { Data } from "../common/data";
const $ = require("jQuery");
const wait_delay = 0;
describe('UserComponent',() => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        UserComponent
      ],
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
  //   let d = Date.now();
  //   it('get user',async( () => {
  //     const fixture = TestBed.createComponent(UserComponent);
  //     const user = fixture.debugElement.componentInstance;
      
  //       fixture.detectChanges();
  //     console.log(user.data);
  //       console.log(Object.keys(user.data).length);
  //       expect(Object.keys(user.data).length).toBeGreaterThan(0);
  //       console.log(Date.now()-d);
  //   }))
  // });
})
