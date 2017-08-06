import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { enableProdMode } from "@angular/core";
import { environment } from "./environments/environment";
import { AppModule } from "./app/app.module";
import { Data } from "./common/data";
import { DevModule } from "./dev/dev.module";

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
if (Data.environment == "dev")
  platformBrowserDynamic().bootstrapModule(DevModule);
