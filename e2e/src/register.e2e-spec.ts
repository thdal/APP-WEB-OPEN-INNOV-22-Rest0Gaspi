import { browser, logging, protractor} from 'protractor';
import {RegisterPage} from "./register.po";

describe('GlobalLive - Register page', () => {
  let page: RegisterPage;

  beforeEach(() => {
    page = new RegisterPage();
    page.navigateTo();
  });

  it('RGPD should be validated', async () => {
    //On rempli le formulaire d'inscription sans cocher la case des RGPD
    await page.signUp({
      firstName: 'fakemail',
      lastName: 'fakepassword',
      email: "fakemail@epsi.fr",
      password: "fakeP@ssword1",
      passwordConf: "fakeP@ssword1",
      rgpdChecked: false,
    });
    //On clique sur le bouton s'inscrire
    await page.clickSubmit();
    //Le message d'erreur des RGPD doit être présent à l'écran
    expect((page.getRGPDErrorMessage()).isPresent()).toBe(true);
    //On ne doit pas avoir été redirigé, on se trouve encore sur le formulaire d'inscription
    expect(browser.wait(protractor.ExpectedConditions.urlContains("register"), 5000)
      .catch(() => {return false})
    ).toBeTruthy(`Url doesn't match`);
  });

  it('Email should be in a valid format', async () => {
    //On rempli le formulaire d'inscription avec toutes les valeurs
    await page.signUp({
      firstName: 'fakemail',
      lastName: 'fakepassword',
      //On remplace @ par # ainsi pour avoir le mauvais format d'e-mail
      email: "fakemail#epsi.fr",
      password: "fakeP@ssword1",
      passwordConf: "fakeP@ssword1",
      rgpdChecked: true,
    });
    //On clique sur le bouton s'inscrire
    await page.clickSubmit();
    //Le message d'erreur des RGPD doit être présent à l'écran
    expect((page.getMAILErrorMessage()).isPresent()).toBe(true);
    //On ne doit pas avoir été redirigé, on se trouve encore sur le formulaire d'inscription
    expect(browser.wait(protractor.ExpectedConditions.urlContains("register"), 5000)
      .catch(() => {return false})
    ).toBeTruthy(`Url doesn't match`);
  });



  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
  });
});
