import { TestBed, async } from "@angular/core/testing";
import { NavigationComponent } from "./navigation.component";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpModule } from "@angular/http";
// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDataService } from "../in-memory-data.service";

import { Data } from "../common/data";

// describe('NavigationComponent', () => {
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         NavigationComponent
//       ],
//       imports: [
//         RouterTestingModule,
//         HttpModule,
//         InMemoryWebApiModule.forRoot(InMemoryDataService)
//       ]
//     });
//     TestBed.compileComponents();
//   });

//   describe('get()', () => {
//     it('list items for Super Admin role',async( () => {
//       Data.account.role = 'Super Admin';
//       const fixture = TestBed.createComponent(NavigationComponent);
//       const nav = fixture.debugElement.componentInstance;
//       fixture.detectChanges();
//       Data.testMode();
//       nav.get().then(res => {
//         fixture.detectChanges();
//         const compiled = fixture.debugElement.nativeElement;
//         expect(compiled.querySelectorAll('ul#navigation li').length).toBeGreaterThan(0);
//         expect(compiled.querySelectorAll('ul#navigation li.projects_li').length).toBe(1);
//         expect(compiled.querySelectorAll('ul#navigation li.languages_li').length).toBe(1);
//         expect(compiled.querySelectorAll('ul#navigation li.collaborators_li').length).toBe(1);
//         expect(compiled.querySelectorAll('ul#navigation li.promo_codes_li').length).toBe(1);
//       })
//     }));
//     it('list items for Admin role',async( () => {
//       Data.account.role = 'Admin';
//       const fixture = TestBed.createComponent(NavigationComponent);
//       const nav = fixture.debugElement.componentInstance;
//       fixture.detectChanges();
//       Data.testMode();
//       nav.get().then(res => {
//         fixture.detectChanges();
//         const compiled = fixture.debugElement.nativeElement;
//         expect(compiled.querySelectorAll('ul#navigation li').length).toBeGreaterThan(0);
//         expect(compiled.querySelectorAll('ul#navigation li.projects_li').length).toBe(1);
//         expect(compiled.querySelectorAll('ul#navigation li.languages_li').length).toBe(1);
//         expect(compiled.querySelectorAll('ul#navigation li.collaborators_li').length).toBe(1);
//         expect(compiled.querySelectorAll('ul#navigation li.promo_codes_li').length).toBe(1);
//       })
//     }));
//     it('list items for Moderator role',async( () => {
//       Data.account.role = 'Moderator';
//       const fixture = TestBed.createComponent(NavigationComponent);
//       const nav = fixture.debugElement.componentInstance;
//       fixture.detectChanges();
//       Data.testMode();
//       nav.get().then(res => {
//         fixture.detectChanges();
//         const compiled = fixture.debugElement.nativeElement;
//         expect(compiled.querySelectorAll('ul#navigation li').length).toBeGreaterThan(0);
//         expect(compiled.querySelectorAll('ul#navigation li.comment_approval_li').length).toBe(1);
//         expect(compiled.querySelectorAll('ul#navigation li.image_approval_li').length).toBe(1);
//         expect(compiled.querySelectorAll('ul#navigation li.audio_approval_li').length).toBe(1);
//       })
//     }));
//     it('list items for Translator role',async( () => {
//       Data.account.role = 'Translator';
//       const fixture = TestBed.createComponent(NavigationComponent);
//       const nav = fixture.debugElement.componentInstance;
//       fixture.detectChanges();
//       Data.testMode();
//       nav.get().then(res => {
//         fixture.detectChanges();
//         const compiled = fixture.debugElement.nativeElement;
//         expect(compiled.querySelectorAll('ul#navigation li').length).toBeGreaterThan(0);
//         expect(compiled.querySelectorAll('ul#navigation li.translation_language_li').length).toBeGreaterThan(0);
//       })
//     }));
//   });
// });
