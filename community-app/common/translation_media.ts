import { JsonDoc } from "./json_doc";
import { Translation } from "./translation";
import { Note } from "./note";

/**
 * Translation Media class
 * @class
 * @extends JsonDoc
 */
export class TranslationMedia extends JsonDoc {

  /**
   * @property {string} instructions - Instructions from moderator
   * @property {Note} note - Moderator note
   * @property {number} [filesize] -  Cached filesize value
   * @property {string} filename - File name
   * @property {string} s3_version_id - AWS S3 Version id
   */

  public instructions: string = "";
  public note: Note = new Note();
  //  public url?:string = '';
  public filesize?: number;
  public filename: string = "";
  public s3_version_id: string = "";

  /**
   * @constructs TranslationMedia
   * @param {TranslationMedia} translation_media -  Translation Media
   * @returns {void}
   */
  constructor(translation_media?: TranslationMedia){
    super(translation_media);
    if(typeof translation_media != 'undefined'){
      if(typeof translation_media.instructions != 'undefined')
        this.instructions = translation_media.instructions;
      if(typeof translation_media.note != 'undefined')
        this.note = new Note(translation_media.note);
      if(typeof translation_media.filesize != 'undefined')
        this.filesize = translation_media.filesize;
      if(typeof translation_media.filename != 'undefined')
        this.filename = translation_media.filename;
      if(typeof translation_media.s3_version_id != 'undefined')
        this.s3_version_id = translation_media.s3_version_id;
    }
  }

  /**
   * Get media URL
   * @returns {string} - URL
   */
  url(): string {
    return (
      "https://s3-us-west-2.amazonaws.com/fel-community/" +
      this.filename +
      (this.s3_version_id != "" && this.s3_version_id != null
        ? "?versionId=" + this.s3_version_id
        : "")
    );
  }

  setInstructions(instructions: string):void{
    this.instructions = instructions;
  }
}
