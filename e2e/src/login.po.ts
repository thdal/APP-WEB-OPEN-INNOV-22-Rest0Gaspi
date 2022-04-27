import { browser, by, element } from 'protractor';

export class LoginPage {
  //Se place sur la bonne page
  navigateTo() {
    return browser.get(browser.baseUrl+'/#/login');
  }

  //Recupére l'element h2 du titre de Connexion
  getTitleText(): Promise<string> {
    return element(by.css('app-login #login-title')).getText() as Promise<string>;
  }

  //Rempli le formulaire
  async signIn({userName, password}) {
    //On met à 0 les valeurs de nos inputs
    await element(by.css('app-login #input-email')).clear();
    await element(by.css('app-login #input-password')).clear();
    //On initialise nos inputs avec nos valeurs
    await element(by.css('app-login #input-email')).sendKeys(userName);
    await element(by.css('app-login #input-password')).sendKeys(password);
  }

  //Clique sur le bouton de Connexion
  async clickSubmit() {
    await element(by.css('app-login #btn-submit')).click();
  }

  //Récupére notre span de message d'erreur
  getErrorMessage() {
    return element(by.css('app-login #span-error-msg'));
  }
}
