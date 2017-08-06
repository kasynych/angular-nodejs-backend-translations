import {JsonDoc} from './json_doc';
import { Subject } from "rxjs/Subject";

/**
 * Note class
 * @class
 * @extends JsonDoc
 */
export class Note extends JsonDoc{

  /**
   * @property {string} text - text
   * @property {string} state - state
   */
  public text:string = '';
  public state:string = '';

  /**
   * @constructs Note
   * @param {Note} [note] - note
   */
  constructor(note?){
    super(note);
    if(typeof note != 'undefined'){
      this.text = note.text;
    }

  }

  /**
   * Gets state subject
   * @returns {Subject<string>}
   */
  public stateSubject():Subject<string>{
    let obj = this;
    let state_subject:Subject<string> = new Subject();
    state_subject.subscribe({
      next: x => {
        obj.state = x;
        switch (x) {
        }
      }
    });
    return state_subject;
  }
}