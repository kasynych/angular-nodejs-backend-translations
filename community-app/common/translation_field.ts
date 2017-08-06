import { Translation } from "./translation";
import { Subject } from "rxjs/Subject";
import { Logger } from "common/logger";
import { TranslationAudio } from "common/translation_audio";
import { TranslationImage } from "common/translation_image";

/**
 * Translation Field class
 * @class
 * @extends Translation
 */
export class TranslationField extends Translation {
  /**
   * @property {string} error - error message
   * @property {string} stored_text - stored text
   * @property {string} state - translation state
   * @property {Subject<string>} state_subject - state subject
   * @property {Object} state_observer - state observer
   */
  error: string = null;
  stored_text: string;
  state: string = "stored";
  state_subject: Subject<string>;
  state_observer = {
    next: x => {
      this.state = x;
      Logger.log("translation " + this.id + " " + this.state);
      switch (x) {
        case "stored":
        case "not stored":
          break;
      }
    }
  };

  /**
   * @constructs TranslationField
   * @param {Translation} translation
   */
  constructor(translation: Translation) {
    super();

    for (var i in translation) this[i] = translation[i];

    this.state = "stored";
    this.stored_text = this.text;
    this.state_subject = new Subject();
    this.state_subject.subscribe(this.state_observer);
  }

  /**
   * Stored
   * @returns {boolean}
   */
  stored(): boolean {
    return this.state == "stored";
    //    return this.stored_translation == this.translation;
  }

  /**
   * Storing
   * @returns {boolean}
   */
  storing(): boolean {
    return this.state == "storing";
  }

  /**
   * Convert TranslationField to Translation
   * @returns {Translation}
   */

  toTranslation(): Translation {
    let translation = new Translation();

    translation._id = this._id;
    translation.id = this.id;
    translation.uuid = this.uuid;
    translation.user = this.user;
    translation.language = this.language;
    translation.created = this.created;
    translation.updated = this.updated;
    translation.english = this.english;
    translation.text = this.text;
    translation.status = this.status;
    translation.comments = this.comments;
    translation.audio_stack = [];

    this.audio_stack.forEach(function(audio){
      let t_audio = new TranslationAudio();
      for(let i in audio)
        t_audio[i] = audio[i];
      translation.audio_stack.push(t_audio);
    })

    translation.images_stack = [];
    this.images_stack.forEach(function(image){
      let t_image = new TranslationImage();
      for(let i in image)
        t_image[i] = image[i];
      translation.images_stack.push(t_image);
    })

    if (typeof this.project != "undefined") translation.project = this.project;
    if (typeof this.project_id != "undefined")
      translation.project_id = this.project_id;
    if (typeof this.language_id != "undefined")
      translation.language_id = this.language_id;
    if (typeof this.topic != "undefined") translation.topic = this.topic;
    if (typeof this.subtopic != "undefined")
      translation.subtopic = this.subtopic;
    if (typeof this.misc != "undefined") translation.misc = this.misc;
    return translation;
  }
}
