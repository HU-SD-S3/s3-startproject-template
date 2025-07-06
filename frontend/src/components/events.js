/* eslint max-classes-per-file: "off" */

export class NavEvent extends Event {
  constructor(page) {
    super("nav-requested");
    this.page = page;
  }
}
