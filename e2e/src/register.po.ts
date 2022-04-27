import { browser, by, element } from 'protractor';

export class RegisterPage {

  //Se place sur la bonne page
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl+'/#/register') as Promise<unknown>;
  }

  //Rempli le formulaire d'inscription
  async signUp({firstName, lastName, email, password, passwordConf, rgpdChecked}) {
    //On clear tous les input
    await element(by.css('app-register #input-firstName')).clear();
    await element(by.css('app-register #input-lastName')).clear();
    await element(by.css('app-register #input-email')).clear();
    await element(by.css('app-register #input-password')).clear();
    await element(by.css('app-register #input-passwordConf')).clear();
    //On initialise nos inputs avec les données souhaités
    await element(by.css('app-register #input-firstName')).sendKeys(firstName);
    await element(by.css('app-register #input-lastName')).sendKeys(lastName);
    await element(by.css('app-register #input-email')).sendKeys(email);
    await element(by.css('app-register #input-password')).sendKeys(password);
    await element(by.css('app-register #input-passwordConf')).sendKeys(passwordConf);
    await element(by.css('app-register #input-radio-genre-1')).click();
    await element(by.css('app-register #input-radio-profile-2')).click();
    if(rgpdChecked)
      await element(by.css('app-register #input-chk-rgpd')).click();
    //Attend 15 seconds
    //await new Promise(resolve => setTimeout(resolve, 15000)); // 15 sec
  }

  //Appel le bouton s'inscrire
  async clickSubmit() {
    await element(by.css('app-register #btn-submit')).click();
  }

  //Recupére le message d'erreur des RGPD
  getRGPDErrorMessage() {
    return element(by.css('app-register #rgpd-error-message'));
  }

  //Recupére le message d'erreur du format d'email invalide
  getMAILErrorMessage() {
    return element(by.css('app-register #span-mail-invalide'));
  }
}
