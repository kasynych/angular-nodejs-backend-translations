import { NgModule } from "@angular/core";

import { TranslationMediaService } from "../translations_media.abstract.service";

@NgModule({})
export class TranslationAudioService extends TranslationMediaService {
  protected url: string = this.getApiUrl() + `/api/translations/audio`;
}
