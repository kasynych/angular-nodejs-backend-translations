import { JsonDoc } from "./json_doc";
import { TranslationMedia } from "./translation_media";

/**
 * Translation Audio class
 * @class
 * @extends TranslationMedia
 */
export class TranslationAudio extends TranslationMedia {

  /**
   * @constructs TranslationAudio
   * @param {TranslationAudio} translation_audio -  Translation Audio
   * @returns {void}
   */
  constructor(translation_audio?:TranslationAudio){
    super(translation_audio);
  }
}
