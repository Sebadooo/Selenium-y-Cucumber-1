const { Given, When, Then } = require("@cucumber/cucumber");
const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");

//     ######   Background   ###### 

Given('Background3 | habiendo iniciado sesión con el email {string} y contraseña {string} y estando en la página de bienvenida con la leyenda {string}',
    { timeout: 20000 },
    async function (email, pass, string) {
        await this.openChrome("https://templates-ui-constancias-qa.apps.ocpqa.andreani.com.ar/");
        const inicialLogin = await this.chromeDriver
            .findElement(By.xpath('/html/body/div[1]/div/div/header/div/div[2]/div/div[2]/span[1]'))
        inicialLogin.click();

        await this.chromeDriver.sleep(3000);

        // Login
        const campoEmail = await this.chromeDriver
            .findElement(By.xpath('/html/body/div[2]/div[2]/div[2]/form/div[3]/div[1]/input'))
        campoEmail.click()
        campoEmail.sendKeys(email);

        const campoPass = await this.chromeDriver
            .findElement(By.xpath("/html/body/div[2]/div[2]/div[2]/form/div[3]/div[2]/input"))
        campoPass.click()
        campoPass.sendKeys(pass);

        await this.chromeDriver.sleep(500)

        const loginButton = await this.chromeDriver
            .findElement(By.xpath("/html/body/div[2]/div[2]/div[2]/form/div[3]/div[5]/button"))
        loginButton.click();

        await this.chromeDriver.sleep(6500)

        // Se comprueba que se muestre el texto "Hola Juan Test1!" 
        const wellcomeTxt = await this.chromeDriver
            .findElement(By.xpath("/html/body/div[1]/div/div/main/div/h1"))
            .getText()
        assert.strictEqual(wellcomeTxt, string);
    });

// 1)    ######   Scenario: Acceder a la página Support   ###### 

When('support1 | se hace click en el menu hamburguesa', async function () {
    await this.chromeDriver.sleep(3000)

    await this.chromeDriver.findElement(By.xpath('//header//button'))
        .click();
});

When('support1 | se hace click en la opción Support', async function () {
    await this.chromeDriver.sleep(500)
    await this.chromeDriver.findElement(By.xpath('/html/body/div[2]/div[3]/ul/div[4]/div[2]/div'))
        .click();
});

Then('support1 | se debería mostrar la leyenda {string}', { timeout: 10000 }, async function (string) {
    await this.chromeDriver.sleep(5000);

    let txt = await this.chromeDriver
        .findElement(By.xpath('/html/body/div[1]/div/div/main/h1'))
        .getText()

    assert.strictEqual(txt, string);

    this.closeChrome();
});

// 2)    ######   Scenario: Scenario: Dejar el input vacío   ######        

When('support2 | se accede a la página {string} y se verifica el título', { timeout: 10000 }, async function (string) {
    await this.chromeDriver.sleep(3000);
    // Se selecciona el manu hamburguesa
    await this.chromeDriver.findElement(By.xpath('//header//button'))
        .click();
    // Se selecciona la opción Support
    await this.chromeDriver.findElement(By.xpath('/html/body/div[2]/div[3]/ul/div[4]/div[2]/div'))
        .click();

    await this.chromeDriver.sleep(3000);
    // Se verifica que el título sea "Support"
    let txt = await this.chromeDriver
        .findElement(By.xpath('/html/body/div[1]/div/div/main/h1'))
        .getText()

    assert.strictEqual(txt, string);
});

When('support2 | dejando el input vacío se selecciona Republicar', async function () {
    await this.chromeDriver
        .findElement(By.xpath('/html/body/div[1]/div/div/main/section[2]/button'))
        .click();

});

Then('support2 | se debería mostrar la leyenda {string}', async function (string) {
    await this.chromeDriver.sleep(1000);

    let txt = await this.chromeDriver
        .findElement(By.xpath('/html/body/div[1]/div/div/main/p'))
        .getText()

    assert.strictEqual(txt, string);

    this.closeChrome();
})

// 2)    ######   Scenario: Enviar datos invalidos   ######        

When('support3 | se accede a la página {string} y se verifica el título', { timeout: 10000 }, async function (string) {
    await this.chromeDriver.sleep(3000);
    // Se selecciona el manu hamburguesa
    await this.chromeDriver.findElement(By.xpath('//header//button'))
        .click();
    // Se selecciona la opción Support
    await this.chromeDriver.findElement(By.xpath('/html/body/div[2]/div[3]/ul/div[4]/div[2]/div'))
        .click();

    await this.chromeDriver.sleep(3000);
    // Se verifica que el título sea "Support"
    let txt = await this.chromeDriver
        .findElement(By.xpath('/html/body/div[1]/div/div/main/h1'))
        .getText()

    assert.strictEqual(txt, string);
});

When('support3 | se escribe {string} en el input y se selecciona Republicar', async function (string) {

    let inputField = await this.chromeDriver.findElement(By.id('input-stylesystem'))
    inputField.click()
    inputField.sendKeys(string);

    await this.chromeDriver.sleep(1000);

    await this.chromeDriver
        .findElement(By.xpath('/html/body/div[1]/div/div/main/section[2]/button'))
        .click();
});

Then('support3 | se debería mostrar la leyenda {string}', async function (string) {
    await this.chromeDriver.sleep(2000);

    let txt = await this.chromeDriver
        .findElement(By.xpath('/html/body/div[1]/div/div[2]'))
        .getText()

    assert.strictEqual(txt, string);

    this.closeChrome();
})

