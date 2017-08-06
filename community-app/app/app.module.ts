import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AppRoutingModule } from "./app-routing.module";
import { MDBBootstrapModule } from "angular-bootstrap-md";

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDataService } from "../in-memory-data.service";

import { AppComponent } from "./app.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { NavigationComponent } from "../navigation/navigation.component";
import { UsersComponent } from "../users/users.component";
import { UserComponent } from "../users/user.component";
import { NotificationsComponent } from "../notifications/notifications.component";
import { ProjectsComponent } from "../projects/projects.component";
import { ProjectComponent } from "../projects/project.component";
import { LanguagesComponent } from "../languages/languages.component";
import { LanguageComponent } from "../languages/language.component";
import { ModerationComponent } from "../moderation/moderation.component";
import { TranslationsComponent } from "../translations/translations.component";
import { CommentsComponent } from "../comments/comments.component";
import { TranslationInfoComponent } from "../translation_info/translation_info.component";
import { TranslationsAudioComponent } from "../translations/audio/translations_audio.component";
import { TranslationsImagesComponent } from "../translations/images/translations_images.component";
import { ModerationAudioComponent } from "../moderation/audio/moderation_audio.component";
import { ModerationImagesComponent } from "../moderation/images/moderation_images.component";
import { ModerationCommentsComponent } from "../moderation/comments/moderation_comments.component";
import { ModerationCommentComponent } from "moderation/comments/moderation_comment.component";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavigationComponent,
    UsersComponent,
    UserComponent,
    NotificationsComponent,
    ProjectsComponent,
    ProjectComponent,
    LanguagesComponent,
    LanguageComponent,
    ModerationComponent,
    TranslationsComponent,
    CommentsComponent,
    TranslationInfoComponent,
    TranslationsAudioComponent,
    TranslationsImagesComponent,
    ModerationAudioComponent,
    ModerationImagesComponent,
    ModerationCommentsComponent ,
    ModerationCommentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    //    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule,
    RouterModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
