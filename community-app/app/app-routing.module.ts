import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DashboardComponent } from "../dashboard/dashboard.component";
import { UsersComponent } from "../users/users.component";
import { UserComponent } from "../users/user.component";
//import { Data } from '../common/data';
import { ProjectsComponent } from "../projects/projects.component";
import { ProjectComponent } from "../projects/project.component";
import { LanguagesComponent } from "../languages/languages.component";
import { LanguageComponent } from "../languages/language.component";
import { ModerationComponent } from "../moderation/moderation.component";
import { TranslationsComponent } from "../translations/translations.component";
import { TranslationsAudioComponent } from "../translations/audio/translations_audio.component";
import { TranslationsImagesComponent } from "../translations/images/translations_images.component";

//let data = new Data();
//console.log(data);
const routes: Routes = [
  { path: "", component: DashboardComponent /*,data: data*/ },
  { path: "users", component: UsersComponent /*,data: data*/ },
  { path: "users/user/:id", component: UserComponent /*,data: data*/ },
  { path: "new-user", component: UserComponent /*,data: data*/ },
  { path: "projects", component: ProjectsComponent },
  { path: "projects/project/:id", component: ProjectComponent /*,data: data*/ },
  { path: "new-project", component: ProjectComponent /*,data: data*/ },
  { path: "languages", component: LanguagesComponent },
  { path: "languages/language/:id", component: LanguageComponent },
  { path: "new-language", component: LanguageComponent },
  { path: "moderation", redirectTo: '/', pathMatch: 'full' },
  { path: "moderation/:moderation_object", component: ModerationComponent },
  { path: "moderation/:moderation_object", component: ModerationComponent },
  { path: "moderation/:moderation_object", component: ModerationComponent },
  { path: "moderation/:moderation_object", component: ModerationComponent },
  {
    path: "translations/project/:id1/language/:id2",
    component: TranslationsComponent
  },
  {
    path: "translations/audio/project/:id1/language/:id2",
    component: TranslationsAudioComponent
  },
  {
    path: "translations/images/project/:id1/language/:id2",
    component: TranslationsImagesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
