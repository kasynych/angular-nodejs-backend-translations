"use strict";const uuid = require('./modules/helpers').uuid;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Json Object
 * @class
 * @abstract
 */
var JsonObject = (function () {
    /**
     * @constructs JsonObject
     * @returns {void}
     */
    function JsonObject(obj) {
        /**
         * property {string} uuid - Unique Object ID
         */
        this.uuid = null;
        if (typeof obj != "undefined" && obj != null) {
            if (typeof obj.uuid != "undefined" && obj.uuid != "" && obj.uuid != null)
                this.uuid = obj.uuid;
            else this.uuid = uuid();
        }
    }
    return JsonObject;
}());
exports.JsonObject = JsonObject;
/**
 * JSON Doc Class
 * @class
 * @abstract
 * @extends JsonObject
 */
var JsonDoc = (function (_super) {
    __extends(JsonDoc, _super);
    /**
     * @constructs JsonDoc
     * @param {Object} obj - an object
     */
    function JsonDoc(obj) {
        var _this = _super.call(this, obj) || this;
        /**
         * @property {string} _id - Json Doc id
         * @property {number} id  - Autoincrement id
         */
        _this._id = "";
        _this.id = 0;
        if (typeof obj != "undefined" && obj != null) {
            if (typeof obj._id != "undefined")
                _this._id = obj._id;
            if (typeof obj.id != "undefined")
                _this.id = obj.id;
        }
        return _this;
    }
    return JsonDoc;
}(JsonObject));
exports.JsonDoc = JsonDoc;
/**
 * Project Class
 * @class
 */
var Project = (function (_super) {
    __extends(Project, _super);
    /**
     * @constructs Project
     * @param {Object} project
     * @returns {void}
     */
    function Project(project) {
        var _this = _super.call(this, project) || this;
        if (typeof project != "undefined") {
            _this.project_name = project.project_name;
            _this.platform = project.platform;
            if (typeof project.project_id != "undefined")
                _this.id = project.project_id;
        }
        return _this;
    }
    return Project;
}(JsonDoc));
exports.Project = Project;
/**
 * User Class
 * @class
 */
var User = (function (_super) {
    __extends(User, _super);
    /**
     * @constructs User
     * @param {Object} user
     * @returns {void}
     */
    function User(user) {
        var _this = _super.call(this, user) || this;
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
        _this.username = null;
        _this.password = null;
        _this.valid = 0;
        _this.type = null;
        _this.role = null;
        _this.type_id = null;
        _this.role_id = null;
        if (typeof user != "undefined") {
            _this.username = user.username;
            _this.password = user.password;
            _this.valid = user.valid;
            _this.type = user.type;
            _this.role = user.role;
            _this.type_id = user.type_id;
            _this.role_id = user.role_id;
            _this.email = user.email;
            _this.firstname = user.firstname;
            _this.lastname = user.lastname;
            _this.languages = user.languages;
            _this.projects = user.projects;
            if (typeof user.user_id != "undefined")
                _this.id = user.user_id;
        }
        return _this;
    }
    return User;
}(JsonDoc));
exports.User = User;
/**
 * Language Class
 * @class
 */
var Language = (function (_super) {
    __extends(Language, _super);
    /**
     * @constructs Language
     * @param {Object} language
     * @returns {void}
     */
    function Language(language) {
        var _this = _super.call(this, language) || this;
        _this.name = "";
        _this.nativeName = "";
        if (typeof language != "undefined") {
            _this.language_number = language.language_number;
            _this.code = language.code;
            _this.name = language.name;
            if (typeof language.nativeName != "undefined")
                _this.nativeName = language.nativeName;
            if (typeof language.language_id != "undefined")
                _this.id = language.language_id;
        }
        return _this;
    }
    return Language;
}(JsonDoc));
exports.Language = Language;
/**
 * Comment class
 * @class
 */
var Comment = (function (_super) {
    __extends(Comment, _super);
    function Comment(comment) {
        var _this = _super.call(this, comment) || this;
        /**
         * @property {User} user          - Commentator
         * @property {string} created     - When comment was created
         * @property {string} updated     -  When comment was updated
         * @property {string} text        - Comment text
         * @property {number} score       - Comment score
         * @property {Comment[]} comments - Comments
         * @property {string} status      - Status
         */
        _this.created = Date.now().toString();
        _this.updated = Date.now().toString();
        _this.text = "";
        _this.user = new User();
        _this.score = 0;
        _this.comments = [];
        _this.status = "new";
        if (typeof comment != "undefined") {
            _this.created = comment.created;
            _this.updated = comment.updated;
            _this.text = comment.text;
            _this.user = new User(comment.user);
            _this.score = comment.score;
            _this.comments = comment.comments.map(function (comment) { return new Comment(comment); });
            _this.status = comment.status;
        }
        return _this;
    }
    return Comment;
}(JsonDoc));
exports.Comment = Comment;
/**
 * Comment Extended class
 * @class
 * @extends Comment
 */
var CommentExtended = (function (_super) {
    __extends(CommentExtended, _super);
    function CommentExtended(comment) {
        var _this = _super.call(this, comment) || this;
        /**
         * @property {Translation} parent_translation - Parent Translation
         * @property {Comment} parent_comment - Parent Comment
         */
        _this.parent_translation = null;
        _this.parent_comment = null;
        if (typeof comment.parent_translation != 'undefined' && comment.parent_translation != null) {
            _this.parent_translation = new Translation(comment.parent_translation);
            _this.parent_translation.comments = [];
        }
        if (typeof comment.parent_comment != 'undefined' && comment.parent_comment != null) {
            _this.parent_comment = new CommentExtended(comment.parent_comment);
            _this.parent_comment.comments = [];
        }
        return _this;
    }
    return CommentExtended;
}(Comment));
exports.CommentExtended = CommentExtended;
/**
 * Translation Media class
 * @class
 * @extends JsonDoc
 */
var TranslationMedia = (function (_super) {
    __extends(TranslationMedia, _super);
    /**
     * Constructs Translation Media class
     * @returns {void}
     */
    function TranslationMedia(translation_media) {
        var _this = _super.call(this, translation_media) || this;
        /**
         * @property {string} instructions - Instructions from moderator
         * @property {Note} note - Moderator note
         * @property {number} [filesize] -  Cached filesize value
         * @property {string} filename - File name
         * @property {string} s3_version_id - AWS S3 Version id
         */
        _this.instructions = "";
        _this.note = new Note();
        _this.filename = "";
        _this.s3_version_id = "";
        if (typeof translation_media != "undefined") {
            _this.instructions = translation_media.instructions;
            if (typeof translation_media.note != 'undefined')
                _this.note = new Note(translation_media.note);
            else
                _this.note = new Note();
            _this.filename = translation_media.filename;
            if (typeof translation_media.filesize != "undefined")
                _this.filesize = translation_media.filesize;
            if (typeof translation_media.s3_version_id != "undefined")
                _this.s3_version_id = translation_media.s3_version_id;
        }
        return _this;
    }
    return TranslationMedia;
}(JsonDoc));
exports.TranslationMedia = TranslationMedia;
/**
 * Translation Audio class
 * @class
 * @extends TranslationMedia
 */
var TranslationAudio = (function (_super) {
    __extends(TranslationAudio, _super);
    /**
     * Constructs Translation Audio class
     * @returns {void}
     */
    function TranslationAudio(translation_audio) {
        var _this = _super.call(this, translation_audio) || this;
        if (typeof translation_audio != "undefined") {
            if (typeof translation_audio.translation_audio_id != "undefined")
                _this.id = translation_audio.translation_audio_id;
        }
        return _this;
    }
    return TranslationAudio;
}(TranslationMedia));
exports.TranslationAudio = TranslationAudio;
/**
 * Translation Image class
 * @class
 * @extends TranslationMedia
 */
var TranslationImage = (function (_super) {
    __extends(TranslationImage, _super);
    /**
     * Constructs Translation Image class
     * @returns {void}
     */
    function TranslationImage(translation_image) {
        var _this = _super.call(this, translation_image) || this;
        if (typeof translation_image != "undefined") {
            if (typeof translation_image.translation_image_id != "undefined")
                _this.id = translation_image.translation_image_id;
        }
        return _this;
    }
    return TranslationImage;
}(TranslationMedia));
exports.TranslationImage = TranslationImage;
/**
 * Translation Class
 * @class
 */
var Translation = (function (_super) {
    __extends(Translation, _super);
    /**
     * @constructs Translation
     * @param {Object} translation
     * @returns {void}
     */
    function Translation(translation) {
        var _this = _super.call(this, translation) || this;
        _this.status = "New";
        _this.export = true;
        _this.comments = [];
        _this.audio_stack = [new TranslationAudio()];
        _this.images_stack = [new TranslationImage()];
        if (typeof translation != "undefined") {
            _this.topic = translation.topic;
            _this.subtopic = translation.subtopic;
            _this.user = new User(translation.user);
            _this.project = new Project(translation.project);
            _this.language = new Language(translation.language);
            _this.created = translation.created;
            _this.updated = translation.updated;
            _this.english = translation.english;
            _this.text = translation.text;
            _this.status = translation.status;
            if (typeof translation.comments != "undefined" &&
                translation.comments.constructor == Array)
                _this.comments = translation.comments.map(function (comment) { return new Comment(comment); });
            _this.audio_stack = translation.audio_stack.map(function (audio) { return new TranslationAudio(audio); });
            if (typeof translation.user_id != "undefined")
                _this.user_id = translation.user_id;
            if (typeof translation.project_id != "undefined")
                _this.project_id = translation.project_id;
            if (typeof translation.project_id != "undefined")
                _this.language_id = translation.language_id;
            _this.images_stack = translation.images_stack.map(function (image) { return new TranslationImage(image); });
            _this.misc = translation.misc;
            if (typeof translation.translation_id != "undefined")
                _this.id = translation.translation_id;
            if (typeof translation.export != "undefined")
                _this.export = translation.export;
        }
        return _this;
    }
    return Translation;
}(JsonDoc));
exports.Translation = Translation;
/**
 * Note class
 * @class
 * @extends JsonDoc
 */
var Note = (function (_super) {
    __extends(Note, _super);
    /**
     * @constructs Note
     * @param {Note} [note] - note
     */
    function Note(note) {
        var _this = _super.call(this, note) || this;
        /**
         * @property {string} text - text
         * @property {string} state - state
         */
        _this.text = '';
        _this.state = '';
        if (typeof note != 'undefined') {
            _this.text = note.text;
        }
        return _this;
    }
    return Note;
}(JsonDoc));
exports.Note = Note;
