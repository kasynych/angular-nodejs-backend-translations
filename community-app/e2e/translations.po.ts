import { browser, element, by, $$ } from "protractor";

export class TranslationsPage {
  navigateTo() {
    return browser.get("/translations/project/1/language/3");
  }

  getContentEl() {
    return element($$("#translations"));
  }

  getTranslationFields() {
    return element.all(by.css("#translations .translation textarea"));
  }

  getChatEl() {
    return element.all(by.css("#chat"));
  }

  getTranslationInfoEl() {
    return element.all(by.css("#translation-info"));
  }
}
