import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { MDBBootstrapModule } from "angular-bootstrap-md";

import { DevComponent } from "./dev.component";

@NgModule({
  declarations: [DevComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [DevComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class DevModule {}
