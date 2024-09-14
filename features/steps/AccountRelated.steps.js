const { Given, When, Then, setDefaultTimeout } = require("@cucumber/cucumber");
const { By, Key, until } = require("selenium-webdriver");
const assert = require("assert");

// Background

Given("Background | estando en la página inicial de CE", { timeout: 15000 }, async function () {
    await this.openChrome("https://templates-ui-constancias-test.apps.ocptest.andreani.com.ar/");
  });

// 1) Scenario: LogIn simple

When("login1 | se presiona el boton Iniciar sesión", async function () {
  await this.chromeDriver
    .findElement(By.xpath("/html/body/div[1]/div/div/header/div/div[2]/div/div[2]/span[1]"))
    .click();
});

Then("login1 | se debería mostrar la leyenda {string}", async function (string) {
  let txt;

  await this.chromeDriver.sleep(3000);

  await this.chromeDriver
    .findElement(By.xpath('//*[@id="api"]/div[1]/h1'))
    .getText()
    .then(function (text) {
      txt = text;
    });

  assert.strictEqual(txt, string);

  this.closeChrome();
});

// 2) Scenario: LogIn failed 1 email not found

When("login2 | se presiona el boton Iniciar sesión, se redirecciona a una nueva página", async function () {
    await this.chromeDriver
      .findElement(By.xpath("/html/body/div[1]/div/div/header/div/div[2]/div/div[2]/span[1]"))
      .click();
  });

When("login2 | se ingresa el email {string}", async function (string) {
  await this.chromeDriver.sleep(3000);

  let campoEmail = await this.chromeDriver
  .findElement(By.xpath("/html/body/div[2]/div[2]/div[2]/form/div[3]/div[1]/input"));
  campoEmail.click();
  campoEmail.sendKeys(string);
});

When("login2 | se ingresa la Contraseña {string}", async function (string) {
  let campoPass = await this.chromeDriver
  .findElement(By.xpath('//*[@id="password"]'));
  campoPass.click();
  campoPass.sendKeys(string);
});

When("login2 | se presiona el boton Iniciar sesión", async function () {
  let botonLogin = await this.chromeDriver
  .findElement(By.xpath('//*[@id="next"]'));
  botonLogin.click();
});

Then("login2 | se debería mostrar la leyenda {string}", async function (string) {
    await this.chromeDriver.sleep(3000);

    let txt;
    await this.chromeDriver
      .findElement(By.xpath("/html/body/div[2]/div[2]/div[2]/form/div[2]"))
      .getText()
      .then(function (text) {
        txt = text;
      });
    assert.strictEqual(txt, string);

    this.closeChrome();
  });

// 3) Scenario: LogIn failed invalid email format

When("login3 | se presiona el boton Iniciar sesión, se redirecciona a una nueva página", async function () {
    await this.chromeDriver
      .findElement(By.xpath("/html/body/div[1]/div/div/header/div/div[2]/div/div[2]/span[1]"))
      .click();
  });

When("login3  | se ingresa el email {string}", async function (string) {
  await this.chromeDriver.sleep(3000);

  let campoEmail = await this.chromeDriver
  .findElement(By.xpath("/html/body/div[2]/div[2]/div[2]/form/div[3]/div[1]/input"));
  campoEmail.click();
  campoEmail.sendKeys(string);
});

When("login3  | se ingresa la Contraseña {string}", async function (string) {
  let campoPass = await this.chromeDriver
  .findElement(By.xpath('//*[@id="password"]'));
  campoPass.click();
  campoPass.sendKeys(string);
});

When("login3  | se presiona el boton Iniciar sesión", async function () {
  let botonLogin = await this.chromeDriver
  .findElement(By.xpath('//*[@id="next"]'));
  botonLogin.click();
});

Then("login3  | se debería mostrar la leyenda {string}", async function (string) {
    await this.chromeDriver.sleep(3500);

    let txt;
    await this.chromeDriver
      .findElement(By.xpath("/html/body/div[2]/div[2]/div[2]/form/div[2]"))
      .getText()
      .then(function (text) {
        txt = text;
      });

    assert.strictEqual(txt, string);

    this.closeChrome();
  }
);

// 4) Scenario: LogIn failed wrong password

When("login4 | se presiona el boton Iniciar sesión, se redirecciona a una nueva página",
  async function () {
    await this.chromeDriver
      .findElement(
        By.xpath(
          "/html/body/div[1]/div/div/header/div/div[2]/div/div[2]/span[1]"
        )
      )
      .click();
  }
);

When("login4 | se ingresa el email {string}", async function (string) {
  await this.chromeDriver.sleep(3000);

  let campoEmail = await this.chromeDriver.findElement(
    By.xpath("/html/body/div[2]/div[2]/div[2]/form/div[3]/div[1]/input")
  );
  campoEmail.click();
  campoEmail.sendKeys(string);
});

When("login4 | se ingresa la Contraseña {string}", async function (string) {
  let campoPass = await this.chromeDriver.findElement(
    By.xpath('//*[@id="password"]')
  );
  campoPass.click();
  campoPass.sendKeys(string);
});

When("login4 | se presiona el boton Iniciar sesión", async function () {
  let botonLogin = await this.chromeDriver.findElement(
    By.xpath('//*[@id="next"]')
  );
  botonLogin.click();
});

Then("login4 | se debería mostrar la leyenda {string}",
  async function (string) {
    await this.chromeDriver.sleep(3000);

    let txt;

    await this.chromeDriver
      .findElement(By.xpath("/html/body/div[2]/div[2]/div[2]/form/div[2]"))
      .getText()
      .then(function (text) {
        txt = text;
      });

    assert.strictEqual(txt, string);

    this.closeChrome();
  }
);

// 5) Scenario: LogIn failed Empty email

When("login5 | se presiona el boton Iniciar sesión, se redirecciona a una nueva página",
  async function () {
    await this.chromeDriver
      .findElement(
        By.xpath(
          "/html/body/div[1]/div/div/header/div/div[2]/div/div[2]/span[1]"
        )
      )
      .click();
  }
);

When("login5 | se ingresa la Contraseña {string}", async function (string) {
  await this.chromeDriver.sleep(3000);

  let campoPass = await this.chromeDriver.findElement(
    By.xpath('//*[@id="password"]')
  );
  campoPass.click();
  campoPass.sendKeys(string);
});

When("login5 | se presiona el boton Iniciar sesión", async function () {
  let botonLogin = await this.chromeDriver.findElement(
    By.xpath('//*[@id="next"]')
  );
  botonLogin.click();
});

Then("login5 | se debería mostrar la leyenda {string}",
  async function (string) {
    await this.chromeDriver.sleep(3000);

    let txt;

    await this.chromeDriver
      .findElement(
        By.xpath("/html/body/div[2]/div[2]/div[2]/form/div[3]/div[1]/div/p")
      )
      .getText()
      .then(function (text) {
        txt = text;
      });

    assert.strictEqual(txt, string);

    this.closeChrome();
  }
);

// 6) Scenario: LogIn failed Empty password

When("login6 | se presiona el boton Iniciar sesión, se redirecciona a una nueva página",
  async function () {
    await this.chromeDriver
      .findElement(
        By.xpath(
          "/html/body/div[1]/div/div/header/div/div[2]/div/div[2]/span[1]"
        )
      )
      .click();
  }
);

When("login6 | se ingresa el email {string}", async function (string) {
  await this.chromeDriver.sleep(3000);

  let campoEmail = await this.chromeDriver.findElement(
    By.xpath("/html/body/div[2]/div[2]/div[2]/form/div[3]/div[1]/input")
  );
  campoEmail.click();
  campoEmail.sendKeys(string);
});

When("login6 | se presiona el boton Iniciar sesión", async function () {
  let botonLogin = await this.chromeDriver.findElement(
    By.xpath('//*[@id="next"]')
  );
  botonLogin.click();
});

Then("login6 | se debería mostrar la leyenda {string}",
  async function (string) {
    await this.chromeDriver.sleep(3000);

    let txt;

    await this.chromeDriver
      .findElement(
        By.xpath("/html/body/div[2]/div[2]/div[2]/form/div[3]/div[2]/div[2]/p")
      )
      .getText()
      .then(function (text) {
        txt = text;
      });

    assert.strictEqual(txt, string);

    this.closeChrome();
  }
);

// 7) Scenario: LogIn succesfully

When("login7 | se presiona el boton Iniciar sesión, se redirecciona a una nueva página", { timeout: 10000 }, async function () {
    await this.chromeDriver
      .findElement(
        By.xpath(
          "/html/body/div[1]/div/div/header/div/div[2]/div/div[2]/span[1]"
        )
      )
      .click();
  }
);

When("login7 | se ingresa el email {string}", async function (string) {
  await this.chromeDriver.sleep(3000);

  let campoEmail = await this.chromeDriver.findElement(
    By.xpath("/html/body/div[2]/div[2]/div[2]/form/div[3]/div[1]/input")
  );
  campoEmail.click();
  campoEmail.sendKeys(string);
});

When("login7 | se ingresa la Contraseña {string}", async function (string) {
  let campoPass = await this.chromeDriver.findElement(
    By.xpath('//*[@id="password"]')
  );
  campoPass.click();
  campoPass.sendKeys(string);
});

When("login7 | se presiona el boton Iniciar sesión", async function () {
  let botonLogin = await this.chromeDriver.findElement(
    By.xpath('//*[@id="next"]')
  );
  botonLogin.click();
});

Then("login7 | se debería mostrar la leyenda {string}",
  async function (string) {
    await this.chromeDriver.sleep(4500);

    let txt;

    await this.chromeDriver
      .findElement(By.xpath("/html/body/div[1]/div/div/main/div/h1"))
      .getText()
      .then(function (text) {
        txt = text;
      });
    assert.strictEqual(txt, string);

    this.closeChrome();
  });

// 8) Scenario: Logout-1 from user name

When("logout1 | se inicia sesión correctamente en la página de CE con las credenciales email {string} y Contraseña {string}", { timeout : 10000 },
  async function (email, pass) {
    await this.chromeDriver
      .findElement(
        By.xpath(
          "/html/body/div[1]/div/div/header/div/div[2]/div/div[2]/span[1]"
        )
      )
      .click();

    await this.chromeDriver.sleep(3000);

    let campoEmail = await this.chromeDriver.findElement(
      By.xpath("/html/body/div[2]/div[2]/div[2]/form/div[3]/div[1]/input")
    );
    campoEmail.click();
    campoEmail.sendKeys(email);

    let campoPass = await this.chromeDriver.findElement(
      By.xpath('//*[@id="password"]')
    );
    campoPass.click();
    campoPass.sendKeys(pass);

    let botonLogin = await this.chromeDriver.findElement(
      By.xpath('//*[@id="next"]')
    );
    botonLogin.click();
  });

When("logout1 | se hace click sobre la leyenda Cerrar sesión",
  async function () {
    await this.chromeDriver.sleep(4500);
    let LogOutButton = await this.chromeDriver
    LogOutButton.findElement(By.xpath("/html/body/div[1]/div/div/header/div/div[2]/div/div[2]/span[2]"))
      .click();
  });

Then("logout1 | se debería volver a la página inicial y ver {string}", async function (string) {
  await this.chromeDriver.sleep(4500);
  let txt;
  await this.chromeDriver
    .findElement(By.xpath("/html/body/div[1]/div/div/main/div/h2"))
    .getText()
    .then(function (text) {
      txt = text;
    });

  assert.strictEqual(txt, string);

  this.closeChrome();
}
);

// 9) Scenario: Logout-2 from burger menu

When("logout2 | se inicia sesión correctamente en la página de CE con las credenciales email {string} y Contraseña {string}", { timeout: 10000 }
 , async function (email, pass) {
    await this.chromeDriver.findElement(
      By.xpath("/html/body/div[1]/div/div/header/div/div[2]/div/div[2]/span[1]"))
      .click();

    await this.chromeDriver.sleep(3000);

    let campoEmail = await this.chromeDriver.findElement(
      By.xpath("/html/body/div[2]/div[2]/div[2]/form/div[3]/div[1]/input")
    );
    campoEmail.click();
    campoEmail.sendKeys(email);

    let campoPass = await this.chromeDriver.findElement(
      By.xpath('//*[@id="password"]')
    );
    campoPass.click();
    campoPass.sendKeys(pass);

    let botonLogin = await this.chromeDriver.findElement(
      By.xpath('//*[@id="next"]')
    );
    botonLogin.click();
  }
);

When("logout2 | se hace click en el menu hamburguesa", { timeout: 10000 },
  async function () {
    await this.chromeDriver.sleep(6500);
    await this.chromeDriver
      .findElement(By.xpath('/html/body/div[1]/div/div/header/div/div[1]/button'))
      .click();
  });

When("logout2 | se selecciona la opción Cerrar sesión", { timeout: 10000 }, async function () {
  await this.chromeDriver.sleep(5000);
  await this.chromeDriver
    .findElement(By.xpath("/html/body/div[2]/div[3]/ul/div[6]"))
    .click();
});

Then("logout2 | se debería volver a la página inicial y ver {string}", { timeout: 10000 }, async function (string) {
  await this.chromeDriver.sleep(5000);
  let txt;
  await this.chromeDriver
    .findElement(By.xpath("/html/body/div[1]/div/div/main/div/h2"))
    .getText()
    .then(function (text) {
      txt = text;
    });
  assert.strictEqual(txt, string);

  this.closeChrome();
});
