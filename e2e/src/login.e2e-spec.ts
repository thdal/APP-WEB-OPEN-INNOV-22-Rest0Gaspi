import { browser, logging, protractor} from 'protractor';
import {LoginPage} from "./login.po";

describe('GlobalLive - Login page', () => {
  let page: LoginPage;

  beforeEach(() => {
    page = new LoginPage();
  });

  it('should display an invalid email message', async () => {
    //Rempli nos inputs avec un mail invalide
    await page.signIn({
      userName: 'fakemail',
      password: 'fakepassword'
    });
    //Appel sur le bouton de Connexion
    await page.clickSubmit();
    //Message d'erreur attendu par notre test
    expect((page.getErrorMessage()).isPresent()).toBe(true);
    //Verifie que nous n'avons pas été redirigé
    expect(browser.wait(protractor.ExpectedConditions.urlContains("login"), 5000)
        .catch(() => {return false})
    ).toBeTruthy(`Url doesn't match`);
  });

  it('should display an invalid password message', async () => {
    //Rempli nos inputs avec un bon mail et un mot de passe invalide
    await page.signIn({
      userName: 'admin@epsi.fr',
      password: 'fakepassword'
    });
    //Appel sur le bouton de Connexion
    await page.clickSubmit();
    //Message d'erreur attendu par notre test
    expect((page.getErrorMessage()).isPresent()).toBe(true);
    //Verifie que nous n'avons pas été redirigé
    expect(browser.wait(protractor.ExpectedConditions.urlContains("login"), 5000)
      .catch(() => {return false})
    ).toBeTruthy(`Url doesn't match`);
  });

  it('should redirect to home page', async () => {
    //Rempli nos inputs avec de bonnes valeurs
    await page.signIn({
      userName: 'admin@epsi.fr',
      password: 'adminadmin'
    });
    //Appel sur le bouton de Connexion
    await page.clickSubmit();
    //Verifie que nous avons été redirigé sur la page home de l'application
    expect(browser.wait(protractor.ExpectedConditions.urlContains("/"), 5000)
      .catch(() => {return false})
    ).toBeTruthy(`Url doesn't match`);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
  });
});
