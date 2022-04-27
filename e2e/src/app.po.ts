import { browser, by, element } from 'protractor';

export class AppPage {

  navigateTo(): Promise<unknown> {
    return browser.get('/') as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    //Attend 15 seconds
    //await new Promise(resolve => setTimeout(resolve, 15000)); // 15 sec
    return element(by.css('app-root .content span')).getText() as Promise<string>;
  }

}
