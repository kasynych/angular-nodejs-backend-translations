import { JsonDoc } from "./json_doc";
import { TranslationMedia } from "./translation_media";

/**
 * Translation Audio class
 * @class
 * @extends TranslationMedia
 */
export class TranslationImage extends TranslationMedia {

  /**
   * @constructs TranslationImage
   * @param {TranslationImage} translation_image -  Translation Image
   * @returns {void}
   */
  constructor(translation_image?:TranslationImage){
    super(translation_image);
  }
}
