import { JsonDoc } from "./json_doc";
import { Language } from "./language";
import { Project } from "./project";

/**
 * User Doc Class
 * @class
 * @extends JsonDoc
 */
export class User extends JsonDoc {
  /**
   * @property {string} username           - Username
   * @property {string} password           - Password
   * @property {number} valid              - User is valid
   * @property {string} type               - User type
   * @property {string} role               - User role
   * @property {number} type_id            - Type ID
   * @property {number} role_id            - Role ID
   * @property {string} email              - User email
   * @property {string} firstname          - User first name
   * @property {string} lastname           - user last name
   * @property {Array<Language>} languages - languages
   */
  public username: string = null;
  public password: string = null;
  public valid: number = 0;
  public type: string = null;
  public role: string = null;
  public type_id: number = null;
  public role_id: number = null;
  public email: string;
  public firstname: string;
  public lastname: string;
  public languages: Array<Language>;
  public projects: Project[];

  /**
   * @constructs User
   * @param {Object} user
   * @returns {void}
   */
  constructor(user?) {
    super(user);
    if (typeof user != "undefined") {
      this.username = user.username;
      this.password = user.password;
      this.valid = user.valid;
      this.type = user.type;
      this.role = user.role;
      this.type_id = user.type_id;
      this.role_id = user.role_id;
      this.email = user.email;
      this.firstname = user.firstname;
      this.lastname = user.lastname;
      this.languages = user.languages;
      this.projects = user.projects;
      if (typeof user.user_id != "undefined") this.id = user.user_id;
    }
  }
}
