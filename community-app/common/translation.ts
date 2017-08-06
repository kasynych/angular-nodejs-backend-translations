import { Language } from "./language";
import { Comment } from "./comment";
import { User } from "./user";
import { Project } from "./project";
import { TranslationAudio } from "./translation_audio";
import { TranslationImage } from "./translation_image";
import { JsonDoc } from "./json_doc";
/**
 * Translation class
 * @class
 * @extends JsonDoc
 */
export class Translation extends JsonDoc {
  /**
   * @property {string} [topic]                - Translation topic
   * @property {string} [subtopic]             - Translation subtopic
   * @property {User} user                     - Translation author
   * @property {number} [user_id]              - Translation author user id
   * @property {string} created                - When translation was created
   * @property {string} updated                - When translation was updated
   * @property {string} english                - Translation english text
   * @property {string} text                   - Translation text
   * @property {string} status                 - Translation status
   * @property {boolean} export                - Exportable flag
   * @property {Comment[]} comments            - Comments
   * @property {Array<TranslationAudio>} audio - Audio
   * @property {Project} [project]             - Project translation belongs to
   * @property {Language} language             - Translation language
   * @property {number} [project_id]           - Project ID
   * @property {number} [language_id]          - Language ID
   * @property {Array<TranslationImage>} image - Images
   * @property {any} [misc]                 - Custom Fields
   */
  public topic?: string;
  public subtopic?: string;
  public user: User;
  public user_id?: number;
  public created: string;
  public updated: string;
  public english: string;
  public text: string;
  public status: string = "New";
  public export: boolean = true;
  public comments: Comment[] = [];
  public audio_stack: TranslationAudio[] = [new TranslationAudio()];
  public project?: Project;
  public language: Language;
  public project_id?: number; // for testing
  public language_id?: number; // for testing
  public images_stack: TranslationImage[] = [new TranslationImage()];
  public misc?: any;


  /**
   * @constructs Translation
   * @param {Object} translation
   * @returns {void}
   */
  constructor(translation?) {
    super(translation);
    if (typeof translation != "undefined") {
      this.topic = translation.topic;
      this.subtopic = translation.subtopic;
      this.user = new User(translation.user);
      this.project = new Project(translation.project);
      this.language = new Language(translation.language);
      this.created = translation.created;
      this.updated = translation.updated;
      this.english = translation.english;
      this.text = translation.text;
      this.status = translation.status;
      if (
        typeof translation.comments != "undefined" &&
        translation.comments.constructor == Array
      )
        this.comments = translation.comments.map(
          comment => new Comment(comment)
        );
      this.audio_stack = translation.audio_stack.map(
        audio => new TranslationAudio(audio)
      );
      if (typeof translation.user_id != "undefined")
        this.user_id = translation.user_id;
      if (typeof translation.project_id != "undefined")
        this.project_id = translation.project_id;
      if (typeof translation.project_id != "undefined")
        this.language_id = translation.language_id;
      this.images_stack = translation.images_stack.map(
        image => new TranslationImage(image)
      );
      this.misc = translation.misc;
      if (typeof translation.translation_id != "undefined")
        this.id = translation.translation_id;
      if (typeof translation.export != "undefined")
        this.export = translation.export;
    }
  }

  /**
   * @param {string} s3_version_id - AWS S3 Version ID
   * @returns {TranslationImage} - Last version of image
   */
  public image(s3_version_id?: string): TranslationImage {
    if (typeof s3_version_id == "undefined")
      return this.images_stack[this.images_stack.length - 1];
    else
      for (let i in this.images_stack)
        if (this.images_stack[i].s3_version_id == s3_version_id)
          return this.images_stack[i];
  }

  /**
   * @param {string} version - AWS S3 Version ID
   * @returns {TranslationAudio} - Last version of audio
   */
  public audio(s3_version_id?: string): TranslationAudio {
    if (typeof s3_version_id == "undefined")
      return this.audio_stack[this.audio_stack.length - 1];
    else
      for (let i in this.audio_stack)
        if (this.audio_stack[i].s3_version_id == s3_version_id)
          return this.audio_stack[i];
  }

  /**
   * @returns {TranslationImage} - Precident version of image
   */
  public prev_image(): TranslationImage {
    if (this.images_stack.length > 1)
      return this.images_stack[this.images_stack.length - 2];
    else return new TranslationImage();
  }

  /**
   * @returns {TranslationAudio} - Precident version of audio
   */
  public prev_audio(): TranslationAudio {
    if (this.audio_stack.length > 1)
      return this.audio_stack[this.audio_stack.length - 2];
    else return new TranslationAudio();
  }
}
