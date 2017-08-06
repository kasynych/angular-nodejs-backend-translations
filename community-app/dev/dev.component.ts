import { Component } from "@angular/core";

import { Base } from "../common/base";
import { Data } from "../common/data";

@Component({
  selector: "dev",
  templateUrl: "./dev.component.html",
  styleUrls: ["./dev.component.css"]
})
export class DevComponent extends Base {
  public setRole(role: string): void {
    Data.account.role = role;
    document.location.href = document.location.href;
  }
}
