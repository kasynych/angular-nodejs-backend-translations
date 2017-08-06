import { browser, element, by } from "protractor";
export class CommunityAppPage {
  navigateTo() {
    return browser.get("/");
  }

  getContentEl() {
    return element(by.css("#content"));
  }
}
