import { User } from "./user";
import { Logger } from "common/logger";
import { Project } from "./project";
import { Language } from "./language";
import { Data } from "./data";
const uuidv1 = require("uuid/v1");

/**
 * Account class
 * @class
 * @extends User
 */
export class Account extends User {
  /**
   * @private {boolean} loaded - Loaded
   */
  private loaded: boolean = false;

  /**
   * @constructs Account
   * @param user
   * @param role 
   * @returns {void}
   */
  constructor(user: User, role: string = null) {
    super();
    if (role == null) {
      for (var i in user) this[i] = user[i];
    } else {
      switch (role.toLowerCase()) {
        case "super admin":
          this.type = "Super Admin";
          break;
        case "admin":
          this.type = "Admin";
          break;
        case "moderator":
          this.type = "Moderator";
          break;
        case "developer":
          this.type = "Developer";
          break;
        case "designer":
          this.type = "Designer";
          break;
        case "audio editor":
          this.type = "Private Collaborator";
          break;
        case "translator":
          this.type = "Private Collaborator";
          break;
        case "contributor":
          this.type = "Private Collaborator";
          break;
        case "player":
          this.type = "Public Collaborator";
          break;
        case "proplayer":
          this.type = "Public Collaborator";
          break;
        case "guest":
          this.type = "Guest";
          break;
        default:
          this.loaded = false;
          return;
      }

      this.role = role;
      this.email = role.toLowerCase().replace(" ", "-") + "@email.com";
      this.username = role.toLowerCase().replace(" ", "") + "_username";
      this.firstname = role + " Firstname";
      this.lastname = role + " Lastname";
      this.valid = 1;
      this.password = uuidv1(this.role + Date.now());
      this.id = Math.round(Math.random() * 99999);
      this._id = Data.generate__id();
      this.languages = [
        {
          _id: "rujkpjauxzmlwmqguu5w7ucl",
          id: 16,
          language_number: 16,
          name: "English",
          code: "en",
          nativeName: ""
        } as Language,
        {
          _id: "v16ckroihjvvhllgomlpldjx",
          id: 49,
          language_number: 49,
          name: "Russian",
          code: "ru",
          nativeName: ""
        } as Language,
        {
          _id: "5jmw8tlbhg424i2dmz0b07gz",
          id: 48,
          language_number: 48,
          name: "Romanian",
          code: "ro",
          nativeName: ""
        } as Language
      ];
      this.projects = [
        {
          _id: "nsna1bzlnqc0wdfiqg1as0yu",
          id: 1,
          project_name: "project1",
          platform: "platform1"
        } as Project,
        {
          _id: "hpdye3loo1n0jpffwy2xuzt6",
          id: 2,
          project_name: "project2",
          platform: "platform2"
        } as Project,
        {
          _id: "r9hn58b8la6x4kw5hdve1wh2",
          id: 3,
          project_name: "project3",
          platform: "platform3"
        } as Project
      ];
    }

    this.loaded = true;
  }

  /**
   * Checks if Account has role
   * @param roles 
   * @param action 
   * @returns {boolean}
   */
  public hasRole(roles: string[], action: string = "error"): boolean {
    if (action == "error") {
      if (roles.indexOf(this.type) == -1 && this.loaded) {
        throw "Access denied";
      }
    } else if (action == "return") {
      if ((roles.indexOf(this.type) == -1 && this.loaded) || !this.loaded) {
        return false;
      }

      return true;
    }
  }

  /**
   * Checks if account is loaded
   * @returns {boolean}
   */
  public isLoaded(): boolean {
    return this.loaded;
  }
}
