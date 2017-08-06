"use strict";
import { Data } from "./data";
const $ = require('jQuery');

/**
 * Base class
 * @class
 * @abstract
 */
export abstract class Base {
  mdbDropdownClick(e: Event){
    $(e.target).closest('.dropdown-menu').prev().html($(e.target).html());
  }
}
