import { InMemoryDbService } from "angular-in-memory-web-api";
import { Item } from "common/item";
import { Translation } from "common/translation";
import { Language } from "common/language";
import { User } from "common/user";
import { Comment } from "common/comment";
import { Project } from "common/project";
import { TranslationAudio } from "common/translation_audio";
import { TranslationImage } from "common/translation_image";
const uuidv1 = require("uuid/v1");
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    /**
     * Users
     */
    const users = [
      {
        _id: "gjx7pow7cw7f6j23vigt4bdd",
        id: 1,
        username: "username1",
        password: "password1",
        email: "email1@email1.com",
        firstname: "Firstname1",
        lastname: "Lastname1",
        type: "Super Admin",
        role: "Super Admin",
        type_id: 1,
        role_id: 1,
        valid: 1,
        projects: [
          {
            _id: "nsna1bzlnqc0wdfiqg1as0yu",
            id: 1,
            project_name: "project1",
            platform: "platform1"
          },
          {
            _id: "hpdye3loo1n0jpffwy2xuzt6",
            id: 2,
            project_name: "project2",
            platform: "platform2"
          },
          {
            _id: "r9hn58b8la6x4kw5hdve1wh2",
            id: 3,
            project_name: "project3",
            platform: "platform3"
          }
        ],
        languages: [
          {
            _id: "rujkpjauxzmlwmqguu5w7ucl",
            id: 1,
            language_number: 1,
            name: "English",
            code: "en",
            nativeName: ""
          },
          {
            _id: "v16ckroihjvvhllgomlpldjx",
            id: 2,
            language_number: 2,
            name: "Russian",
            code: "ru",
            nativeName: ""
          },
          {
            _id: "5jmw8tlbhg424i2dmz0b07gz",
            id: 3,
            language_number: 3,
            name: "Romanian",
            code: "ro",
            nativeName: ""
          }
        ]
      } as User,
      {
        _id: "x4ihiseag8i2wj0r24le2wuu",
        id: 2,
        username: "username2",
        password: "password2",
        email: "email1@email1.com",
        firstname: "Firstname1",
        lastname: "Lastname1",
        type: "Admin",
        role: "Admin",
        type_id: 2,
        role_id: 2,
        valid: 1,
        projects: [
          {
            _id: "nsna1bzlnqc0wdfiqg1as0yu",
            id: 1,
            project_name: "project1",
            platform: "platform1"
          },
          {
            _id: "hpdye3loo1n0jpffwy2xuzt6",
            id: 2,
            project_name: "project2",
            platform: "platform2"
          },
          {
            _id: "r9hn58b8la6x4kw5hdve1wh2",
            id: 3,
            project_name: "project3",
            platform: "platform3"
          }
        ],
        languages: [
          {
            _id: "rujkpjauxzmlwmqguu5w7ucl",
            id: 1,
            language_number: 1,
            name: "English",
            code: "en",
            nativeName: ""
          },
          {
            _id: "v16ckroihjvvhllgomlpldjx",
            id: 2,
            language_number: 2,
            name: "Russian",
            code: "ru",
            nativeName: ""
          },
          {
            _id: "5jmw8tlbhg424i2dmz0b07gz",
            id: 3,
            language_number: 3,
            name: "Romanian",
            code: "ro",
            nativeName: ""
          }
        ]
      } as User,
      {
        _id: "7pfip4lktxif5e8dqlvzoikq",
        id: 3,
        username: "username3",
        password: "password3",
        email: "email1@email1.com",
        firstname: "Firstname1",
        lastname: "Lastname1",
        type: "Moderator",
        role: "Moderator",
        type_id: 3,
        role_id: 3,
        valid: 1,
        projects: [],
        languages: []
      } as User,
      {
        _id: "34j1jv93fbsqwmgd1tjpikjg",
        id: 4,
        username: "username4",
        password: "password4",
        email: "email1@email1.com",
        firstname: "Firstname1",
        lastname: "Lastname1",
        type: "Developer",
        role: "Developer",
        type_id: 4,
        role_id: 4,
        valid: 1,
        projects: [
          {
            _id: "nsna1bzlnqc0wdfiqg1as0yu",
            id: 1,
            project_name: "project1",
            platform: "platform1"
          },
          {
            _id: "hpdye3loo1n0jpffwy2xuzt6",
            id: 2,
            project_name: "project2",
            platform: "platform2"
          },
          {
            _id: "r9hn58b8la6x4kw5hdve1wh2",
            id: 3,
            project_name: "project3",
            platform: "platform3"
          }
        ],
        languages: []
      } as User,
      {
        _id: "mdw3j3fpfajy2lgoyu6sn5wl",
        id: 5,
        username: "username5",
        password: "password5",
        email: "email1@email1.com",
        firstname: "Firstname1",
        lastname: "Lastname1",
        type: "Designer",
        role: "Designer",
        type_id: 5,
        role_id: 5,
        valid: 1,
        projects: [],
        languages: []
      } as User,
      {
        _id: "tk0b6y1yo6q6p2nn41p2v2vp",
        id: 5,
        username: "username6",
        password: "password6",
        email: "email1@email1.com",
        firstname: "Firstname1",
        lastname: "Lastname1",
        type: "Private Collaborator",
        role: "Contributor",
        type_id: 6,
        role_id: 6,
        valid: 1,
        projects: [],
        languages: []
      } as User,
      {
        _id: "bnb2qchnua4pc92vtrq6zstm",
        id: 5,
        username: "username7",
        password: "password7",
        email: "email1@email1.com",
        firstname: "Firstname1",
        lastname: "Lastname1",
        type: "Private Collaborator",
        role: "Translator",
        type_id: 7,
        role_id: 7,
        valid: 1,
        projects: [
          {
            _id: "nsna1bzlnqc0wdfiqg1as0yu",
            id: 1,
            project_name: "project1",
            platform: "platform1"
          },
          {
            _id: "hpdye3loo1n0jpffwy2xuzt6",
            id: 2,
            project_name: "project2",
            platform: "platform2"
          },
          {
            _id: "r9hn58b8la6x4kw5hdve1wh2",
            id: 3,
            project_name: "project3",
            platform: "platform3"
          }
        ],
        languages: [
          {
            _id: "rujkpjauxzmlwmqguu5w7ucl",
            id: 1,
            language_number: 1,
            name: "English",
            code: "en",
            nativeName: ""
          },
          {
            _id: "v16ckroihjvvhllgomlpldjx",
            id: 2,
            language_number: 2,
            name: "Russian",
            code: "ru",
            nativeName: ""
          },
          {
            _id: "5jmw8tlbhg424i2dmz0b07gz",
            id: 3,
            language_number: 3,
            name: "Romanian",
            code: "ro",
            nativeName: ""
          }
        ]
      } as User,
      {
        _id: "vkz6tbwp8z7mdyrzxvzopwls",
        id: 5,
        username: "username7",
        password: "password7",
        email: "email1@email1.com",
        firstname: "Firstname1",
        lastname: "Lastname1",
        type: "Private Collaborator",
        role: "Audio Editor",
        type_id: 8,
        role_id: 8,
        valid: 1,
        projects: [],
        languages: []
      } as User,
      {
        _id: "5lsvx7557pleah76l2ndqm51",
        id: 5,
        username: "username7",
        password: "password7",
        email: "email1@email1.com",
        firstname: "Firstname1",
        lastname: "Lastname1",
        type: "Public Collaborator",
        role: "Player",
        type_id: 8,
        role_id: 9,
        valid: 1,
        projects: [],
        languages: []
      } as User,
      {
        _id: "ajkjp1d1m9l0uc7dlcenoqyl",
        id: 5,
        username: "username7",
        password: "password7",
        email: "email1@email1.com",
        firstname: "Firstname1",
        lastname: "Lastname1",
        type: "Public Collaborator",
        role: "ProPlayer",
        type_id: 9,
        role_id: 10,
        valid: 1,
        projects: [],
        languages: []
      } as User
    ];

    /**
     * User Types
     */
    // const user_types = [
    //   { _id: 'vwd91m8b8dy21x7sm2d7uio0', id:1, user_type: "Super Admin"},
    //   { _id: 'xdx7kgd9ymm8veahpc0y6vm2', id:2, user_type: "Admin"},
    //   { _id: 'n8tf1cnd9fldwzmg0xw0sub2', id:3, user_type: "Moderator"},
    //   { _id: 'zxxli9i7zvem5lpbebrzttrc', id:4, user_type: "Developer"},
    //   { _id: '1myhfv1u3clw5gqom1lbb3a3', id:5, user_type: "Designer"},
    //   { _id: 'g4e3r4azl8phzud1v0b15mmo', id:6, user_type: "Audio Editor"},
    //   { _id: 'vh53tfe90qfdxvyiaqoq0g8w', id:7, user_type: "Private Collaborator"},
    //   { _id: '3syosve1kwtirqfcsfa6tltj', id:8, user_type: "Public Collaborator"},
    //   { _id: 'jz6b1lbcbb9oz0asdnuxk1gy', id:9, user_type: "Guest"}
    // ];

    // /**
    //  * User Roles
    //  */
    // const user_roles = [
    //   { _id: 't7qoh4jmdzfkozi0ffmn5zmy', id:1, user_role: "Super Admin"},
    //   { _id: '6u3llz2hbr741cv8dwinyv9f', id:2, user_role: "Admin"},
    //   { _id: '0o382jknoobkepbhygnfuo4g', id:3, user_role: "Moderator"},
    //   { _id: 'vyr6cui776p5ciynml02yzqd', id:4, user_role: "Developer"},
    //   { _id: 'q7bl0dwacmm3snsy19ova0j2', id:5, user_role: "Designer"},
    //   { _id: 'sz9e0ieusxf7w540wvwflpbj', id:6, user_role: "Audio Editor"},
    //   { _id: 'ryj73oernrp00day2q4nx047', id:7, user_role: "Translator"},
    //   { _id: 'fzc4t05tm17e5bi4wwlvsjm7', id:8, user_role: "Contributor"},
    //   { _id: '0hbp961zti72t7mhtda9yzqv', id:9, user_role: "Player"},
    //   { _id: 'ryy368wfgzdqzr4u2edz9818', id:10, user_role: "ProPlayer"},
    //   { _id: 'gyunt43bguavhgdg19ocp84o', id:11, user_type: "Guest"}
    // ];

    // /**
    //  * Projects
    //  */
    // const projects = [
    //   { _id: 'nsna1bzlnqc0wdfiqg1as0yu', id:1, project_name: 'project1', platform: 'platform1'},
    //   { _id: 'hpdye3loo1n0jpffwy2xuzt6', id:2, project_name: 'project2', platform: 'platform2'},
    //   { _id: 'r9hn58b8la6x4kw5hdve1wh2', id:3, project_name: 'project3', platform: 'platform3'},
    //   { _id: 'n587jgaga67s28ec1tzyd7qr', id:4, project_name: 'project4', platform: 'platform4'},
    //   { _id: 'qz4sxnq0rbtynqgt3spt88j4', id:5, project_name: 'project5', platform: 'platform5'},
    //   { _id: 'wld1304vy10efdektc11zg2h', id:6, project_name: 'project6', platform: 'platform6'},
    //   { _id: 'npikze3j6k6rcvzx4xum7jzt', id:7, project_name: 'project7', platform: 'platform7'},
    //   { _id: '2kc0radlb7ienyn4r1uqzzv4', id:8, project_name: 'project8', platform: 'platform8'},
    //   { _id: '0vb8rxprera4x6ahognh74kf', id:9, project_name: 'project9', platform: 'platform9'},
    //   { _id: 'jzco8bptmh80wu8ydr0e5xz2', id:10, project_name: 'project10', platform: 'platform10'}
    // ];

    // /**
    //  * Languages
    //  */
    // const languages = [
    //   { _id: 'rujkpjauxzmlwmqguu5w7ucl', id:1, language_number: 1, name: 'English', code: 'en', nativeName: ''},
    //   { _id: 'v16ckroihjvvhllgomlpldjx', id:2, language_number: 2, name: 'Russian', code: 'ru', nativeName: ''},
    //   { _id: '5jmw8tlbhg424i2dmz0b07gz', id:3, language_number: 3, name: 'Romanian', code: 'ro', nativeName: ''},
    //   { _id: 'rhdav2dfijqrwqqd56f5zox0', id:4, language_number: 4, name: 'French', code: 'fr', nativeName: ''},
    //   { _id: '6gjtze8icc5hxtujfd4o7f6l', id:5, language_number: 5, name: 'German', code: 'de', nativeName: ''},
    //   { _id: 'hsgu9bk9r0wuvo67edzpkvse', id:6, language_number: 6, name: 'Ukranian', code: 'ua', nativeName: ''},
    //   { _id: 'ea378f78o5ehbhjsynqny7ef', id:7, language_number: 7, name: 'Spanish', code: 'sp', nativeName: ''},
    //   { _id: 'd7t8f4qbq02ehc51b2wckssu', id:8, language_number: 8, name: 'Italian', code: 'it', nativeName: ''}
    // ];

    // /**
    //  * Translations
    //  */
    // let translations = [{_id:'j1na1nb4mg42pf7ipdc52ra7',id:1,project:projects[0],project_id:1,topic:"Topic",subtopic:"Subtopic",language_id:1,images_stack:[{uuid:uuidv1(),instructions:'Inistruction 1',notes:'note1',url:'http://uploads.webflow.com/55b1691d79c1f9ed2a7f59e4/55b1751bfc3439de47b31b44_placeholder.png',filename:'55b1751bfc3439de47b31b44_placeholder.png',s3_version_id:"",filesize:3234} as TranslationImage],status:"New",language:languages[0] as Language, uuid: uuidv1(), user:users[0], user_id:1, english:"Phrase1_eng", text:'Phrase1_lang1', audio_stack: [{uuid:uuidv1(),instructions:'Inistruction 1',notes:'note1',url:'https://s3-us-west-2.amazonaws.com/test3213/O.Torvald+-+Time+(Eurovision+2017).mp3',filename:'O.Torvald+-+Time+(Eurovision+2017).mp3',s3_version_id:"",language_id:1,filesize:3234} as TranslationAudio], created:'2017-07-10 12:12:12',updated:'2017-07-10 14:14:14', export:true, comments:[{uuid:uuidv1(),text:'a comment', created:'2017-07-10 12:12:12',updated:'2017-07-10 14:14:14',user:users[0],score:3,comments:[]},{uuid:uuidv1(),text:'a comment2', created:'2017-07-10 12:12:12',updated:'2017-07-10 14:14:14',user:users[1],score:5,comments:[]}]} as Translation,
    //                     {_id:'gf10qsp5wdm198g50oby9pwd',id:2,project:projects[0],project_id:1,topic:"Topic",subtopic:"Subtopic",language_id:2,images_stack:[{uuid:uuidv1(),instructions:'Inistruction 1',notes:'note1',url:'http://uploads.webflow.com/55b1691d79c1f9ed2a7f59e4/55b1751bfc3439de47b31b44_placeholder.png',filename:'55b1751bfc3439de47b31b44_placeholder.png',s3_version_id:"",filesize:3234} as TranslationImage],status:"New",language:languages[1] as Language, uuid: uuidv1(), user:users[0], user_id:1, english:"Phrase2_eng", text:'Phrase2_lang2', audio_stack: [{uuid:uuidv1(),instructions:'Inistruction 2',notes:'note2',url:'https://s3-us-west-2.amazonaws.com/test3213/O.Torvald+-+Time+(Eurovision+2017).mp3',filename:'O.Torvald+-+Time+(Eurovision+2017).mp3',s3_version_id:"",language_id:2,filesize:3234} as TranslationAudio], created:'2017-07-10 12:12:12',updated:'2017-07-10 14:14:14', export:true, comments:[{uuid:uuidv1(),text:'a comment3', created:'2017-07-10 12:12:12',updated:'2017-07-10 14:14:14',user:users[0],score:3,comments:[]}]} as Translation,
    //                     {_id:'gwk9rj828ob88slx9ciwj7e1',id:3,project:projects[0],project_id:1,topic:"Topic",subtopic:"Subtopic",language_id:3,images_stack:[{uuid:uuidv1(),instructions:'Inistruction 1',notes:'note1',url:'http://uploads.webflow.com/55b1691d79c1f9ed2a7f59e4/55b1751bfc3439de47b31b44_placeholder.png',filename:'55b1751bfc3439de47b31b44_placeholder.png',s3_version_id:"",filesize:3234} as TranslationImage],status:"New",language:languages[2] as Language, uuid: uuidv1(), user:users[0], user_id:1, english:"Phrase3_eng", text:'Phrase3_lang3', audio_stack: [{uuid:uuidv1(),instructions:'Inistruction 3',notes:'note3',url:'https://s3-us-west-2.amazonaws.com/test3213/O.Torvald+-+Time+(Eurovision+2017).mp3',filename:'O.Torvald+-+Time+(Eurovision+2017).mp3',s3_version_id:"",language_id:3,filesize:3234} as TranslationAudio], created:'2017-07-10 12:12:12',updated:'2017-07-10 14:14:14', export:true, comments:[{uuid:uuidv1(),text:'a comment', created:'2017-07-10 12:12:12',updated:'2017-07-10 14:14:14',user:users[0],score:3,comments:[]},{uuid:uuidv1(),text:'a comment2', created:'2017-07-10 12:12:12',updated:'2017-07-10 14:14:14',user:users[1],score:5,comments:[]}]} as Translation,
    //                     {_id:'3kd2e35er6c8blfm6awufzbh',id:4,project:projects[0],project_id:1,topic:"Topic",subtopic:"Subtopic",language_id:3,images_stack:[{uuid:uuidv1(),instructions:'Inistruction 1',notes:'note1',url:'http://uploads.webflow.com/55b1691d79c1f9ed2a7f59e4/55b1751bfc3439de47b31b44_placeholder.png',filename:'55b1751bfc3439de47b31b44_placeholder.png',s3_version_id:"",filesize:3234} as TranslationImage],status:"New",language:languages[2] as Language, uuid: uuidv1(), user:users[0], user_id:1, english:"Phrase4_eng", text:'Phrase4_lang3', audio_stack: [{uuid:uuidv1(),instructions:'Inistruction 3',notes:'note3',url:'https://s3-us-west-2.amazonaws.com/test3213/O.Torvald+-+Time+(Eurovision+2017).mp3',filename:'O.Torvald+-+Time+(Eurovision+2017).mp3',s3_version_id:"",language_id:3,filesize:3234} as TranslationAudio], created:'2017-07-10 12:12:12',updated:'2017-07-10 14:14:14', export:true, comments:[{uuid:uuidv1(),text:'a comment3', created:'2017-07-10 12:12:12',updated:'2017-07-10 14:14:14',user:users[0],score:3,comments:[]}]} as Translation,
    //                     {_id:'9rmqjh4pp9dmb8pad26g1ei7',id:5,project:projects[0],project_id:1,topic:"Topic",subtopic:"Subtopic",language_id:3,images_stack:[{uuid:uuidv1(),instructions:'Inistruction 1',notes:'note1',url:'http://uploads.webflow.com/55b1691d79c1f9ed2a7f59e4/55b1751bfc3439de47b31b44_placeholder.png',filename:'55b1751bfc3439de47b31b44_placeholder.png',s3_version_id:"",filesize:3234} as TranslationImage],status:"New",language:languages[2] as Language, uuid: uuidv1(), user:users[0], user_id:1, english:"Phrase5_eng", text:'Phrase5_lang3', audio_stack: [{uuid:uuidv1(),instructions:'Inistruction 3',notes:'note3',url:'https://s3-us-west-2.amazonaws.com/test3213/O.Torvald+-+Time+(Eurovision+2017).mp3',filename:'O.Torvald+-+Time+(Eurovision+2017).mp3',s3_version_id:"",language_id:3,filesize:3234} as TranslationAudio], created:'2017-07-10 12:12:12',updated:'2017-07-10 14:14:14', export:true, comments:[],misc:{"gender":"male","part_of_speach":"noun",uuid:uuidv1(),export:true,"conjugations":{"1_singular":"blabla1","2_singular":"blabla2",uuid:uuidv1(),export:true},"a":{"very":{"nested":"object",uuid:uuidv1(),export:true},uuid:uuidv1(),export:true}}} as Translation,
    //                     {_id:'x6cyhd23120o67nry24lp3i8',id:6,project:projects[0],project_id:1,topic:"Topic",subtopic:"Subtopic",language_id:4,images_stack:[{uuid:uuidv1(),instructions:'Inistruction 1',notes:'note1',url:'http://uploads.webflow.com/55b1691d79c1f9ed2a7f59e4/55b1751bfc3439de47b31b44_placeholder.png',filename:'55b1751bfc3439de47b31b44_placeholder.png',s3_version_id:"",filesize:3234} as TranslationImage],status:"New",language:languages[3] as Language, uuid: uuidv1(), user:users[0], user_id:1, english:"Phrase6_eng", text:'Phrase6_lang6', audio_stack: [{uuid:uuidv1(),instructions:'Inistruction 6',notes:'note6',url:'https://s3-us-west-2.amazonaws.com/test3213/O.Torvald+-+Time+(Eurovision+2017).mp3',filename:'O.Torvald+-+Time+(Eurovision+2017).mp3',s3_version_id:"",language_id:4,filesize:3234} as TranslationAudio], created:'2017-07-10 12:12:12',updated:'2017-07-10 14:14:14', export:true, comments:[]} as Translation,
    //                     {_id:'cn1w9lzdzckuemd8j00n70im',id:7,project:projects[0],project_id:1,topic:"Topic",subtopic:"Subtopic",language_id:5,images_stack:[{uuid:uuidv1(),instructions:'Inistruction 1',notes:'note1',url:'http://uploads.webflow.com/55b1691d79c1f9ed2a7f59e4/55b1751bfc3439de47b31b44_placeholder.png',filename:'55b1751bfc3439de47b31b44_placeholder.png',s3_version_id:"",filesize:3234} as TranslationImage],status:"New",language:languages[4] as Language, uuid: uuidv1(), user:users[0], user_id:1, english:"Phrase7_eng", text:'Phrase7_lang7', audio_stack: [{uuid:uuidv1(),instructions:'Inistruction 7',notes:'note7',url:'https://s3-us-west-2.amazonaws.com/test3213/O.Torvald+-+Time+(Eurovision+2017).mp3',filename:'O.Torvald+-+Time+(Eurovision+2017).mp3',s3_version_id:"",language_id:5,filesize:3234} as TranslationAudio], created:'2017-07-10 12:12:12',updated:'2017-07-10 14:14:14', export:true, comments:[]} as Translation,
    //                     {_id:'z4w23nylqm3v0r1o2hloffup',id:8,project:projects[0],project_id:1,topic:"Topic",subtopic:"Subtopic",language_id:6,images_stack:[{uuid:uuidv1(),instructions:'Inistruction 1',notes:'note1',url:'http://uploads.webflow.com/55b1691d79c1f9ed2a7f59e4/55b1751bfc3439de47b31b44_placeholder.png',filename:'55b1751bfc3439de47b31b44_placeholder.png',s3_version_id:"",filesize:3234} as TranslationImage],status:"New",language:languages[5] as Language, uuid: uuidv1(), user:users[0], user_id:1, english:"Phrase8_eng", text:'Phrase8_lang8', audio_stack: [{uuid:uuidv1(),instructions:'Inistruction 8',notes:'note8',url:'https://s3-us-west-2.amazonaws.com/test3213/O.Torvald+-+Time+(Eurovision+2017).mp3',filename:'O.Torvald+-+Time+(Eurovision+2017).mp3',s3_version_id:"",language_id:6,filesize:3234} as TranslationAudio], created:'2017-07-10 12:12:12',updated:'2017-07-10 14:14:14', export:true, comments:[]} as Translation
    //                     ];

    // const comments = [{uuid:uuidv1(),translation:translations[0],translation_uuid:uuidv1(),text:'a comment', created:'2017-07-10 12:12:12',updated:'2017-07-10 14:14:14',user:users[0],score:3,comments:[]},
    //                   {uuid:uuidv1(),text:'a comment2', created:'2017-07-10 12:12:12',updated:'2017-07-10 14:14:14',user:users[1],score:5,comments:[]}];

    // const dashboard = [{"id":"translator",
    //                     "1": // prject id = 1
    //                         {"1": // language id = 1
    //                             {"new":3,"for_review":"21","answer_user_questions":"32"},
    //                          "2": // language id = 2
    //                             {"new":9,"for_review":"1","answer_user_questions":"2"},
    //                          "3": // language id = 3
    //                             {"new":2,"for_review":"12","answer_user_questions":"5"}},
    //                     "2": // prject id = 2
    //                         {"1":{"new":1,"for_review":"21","answer_user_questions":"2"},
    //                          "2":{"new":6,"for_review":"1","answer_user_questions":"4"},
    //                          "3":{"new":3,"for_review":"4","answer_user_questions":"5"}},
    //                     "3": // prject id = 3
    //                         {"1":{"new":2,"for_review":"5","answer_user_questions":"6"},
    //                          "2":{"new":7,"for_review":"9","answer_user_questions":"2"},
    //                          "3":{"new":5,"for_review":"4","answer_user_questions":"5"}}}];

    return { users };
  }
}

/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
