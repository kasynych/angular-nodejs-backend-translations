/**
 * Site navigation item class
 * @class
 */
export class NavigationItem {
  /**
   * @property {string} title: Navigation item text
   * @property {string} href: Navigation item link href
   * @property {string} css_class: Item css class
   * @property {NavigationItm[]} subitems: Navigation itemsubitems
   */
  public title: string;
  public href: string;
  public css_class: string;
  public subitems: NavigationItem[];

  /**
   * @constructs NavigationItem
   * @returns {void}
   */
  constructor(
    title: string,
    href: string = "",
    subitems: NavigationItem[] = [],
    css_class = ""
  ) {
    this.title = title;
    this.href = href;
    this.subitems = subitems;
    this.css_class = css_class;
  }
}
