import { TestBed, async } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { UsersComponent } from "./users.component";
import { HttpModule } from "@angular/http";
// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDataService } from "../in-memory-data.service";
import { Data } from "../common/data";
const wait_delay = 500;
describe('UsersComponent',() => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        UsersComponent
      ],
      imports: [
        HttpModule,
        // InMemoryWebApiModule.forRoot(InMemoryDataService),
        RouterTestingModule
      ]
    });
    TestBed.compileComponents();
  }); 

  it('should create the users component', async(() => {
    const fixture = TestBed.createComponent(UsersComponent);
    const notifications = fixture.debugElement.componentInstance;
    expect(notifications).toBeTruthy();
  }));

  describe('load()', () => {
    it('list users',async( () => {
      const fixture = TestBed.createComponent(UsersComponent);
      const users = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      Data.testMode();
      users.load()
      .then(res =>{
        fixture.detectChanges();
        expect(users.data.length).toBeGreaterThan(0);
      });
    }))
  });
})
