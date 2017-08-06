import { CommunityAppPage } from "./app.po";
import { TranslationsPage } from "./translations.po";
const $ = require("jQuery");
describe("community-app App", function() {
  let homepage: CommunityAppPage;

  beforeEach(() => {
    homepage = new CommunityAppPage();
  });

  it("Homepage: #content element should exist", () => {
    homepage.navigateTo();
    expect(homepage.getContentEl()).toBeTruthy();
  });
});

describe("Translations Page", function() {
  let translations_page: TranslationsPage;
  beforeEach(() => {
    translations_page = new TranslationsPage();
  });
  it("#translations element should exist", () => {
    translations_page.navigateTo();
    expect(translations_page.getContentEl()).toBeTruthy();
  });

  it("Translation fields should exist", () => {
    translations_page.navigateTo();
    translations_page.getTranslationFields().then(function(els) {
      expect(els.length).toBeGreaterThan(0);
    });
  });

  it("Chat should appear on focus", () => {
    translations_page.navigateTo();
    translations_page.getTranslationFields().then(function(els) {
      expect(translations_page.getChatEl()).toBeTruthy();
      els[0].click().then(() => {
        translations_page.getChatEl().then(els => {
          expect(els.length).toBe(1);
        });
      });
    });
  });

  it("Additional info should appear on focus", () => {
    translations_page.navigateTo();
    translations_page.getTranslationFields().then(function(els) {
      els[0].click().then(() => {
        translations_page.getTranslationInfoEl().then(els => {
          expect(els.length).toBe(1);
        });
      });
    });
  });
});
