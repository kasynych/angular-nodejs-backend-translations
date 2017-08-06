import { NgModule } from "@angular/core";
import { CrudService } from "../common/crud_service";
import { Data } from "common/data";

@NgModule({})
export /**
 * User Service class
 * @class
 * @extends CrudService
 */
class UserService extends CrudService {
  protected url: string = this.getApiUrl() + `/api/users`;
}

/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
