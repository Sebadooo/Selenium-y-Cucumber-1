const { Given, When, Then } = require("@cucumber/cucumber");
const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");

//     ######   Background   ###### 

Given('Background2 | habiendo iniciado sesión con el email {string} y contraseña {string} y estando en la página de bienvenida con la leyenda {string}',
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

        await this.chromeDriver.sleep(3000)
    });

// 1)    ######   Scenario: Acceder a la página Contratos   ###### 

When('Contratos1 | se hace click en el menu hamburguesa', async function () {
    await this.chromeDriver.findElement(By.xpath('//header//button'))
        .click();
});

When('Contratos1 | se hace click en la opción Contratos', async function () {
    await this.chromeDriver.sleep(500)
    await this.chromeDriver.findElement(By.xpath('/html/body/div[2]/div[3]/ul/div[3]'))
        .click();
        await this.chromeDriver.sleep(3000);
});

Then('Contratos1 | se debería mostrar la leyenda {string}', { timeout: 10000 }, async function (string) {
    let txt = await this.chromeDriver
        .findElement(By.xpath('/html/body/div[1]/div/div/main/h1'))
    .getText()
    assert.strictEqual(txt, string);

});

Then('Contratos1 | se debería mostrar la tabla {string}', { timeout: 10000 }, async function (string) {
    await this.chromeDriver.sleep(5000);

    let txt2 = await this.chromeDriver
        .findElement(By.xpath('/html/body/div[1]/div/div/main/div[2]/div/div/button'))
        .getText()
    assert.strictEqual(txt2, string);

    this.closeChrome();
});

// 2)    ######   Scenario: Intentar configurar dejando los campos por default   ######


When('Contratos2 | se accede a la página Contratos', async function () {
    await this.chromeDriver
        .findElement(By.xpath('//header//button'))
        .click();
    await this.chromeDriver.sleep(500)
    await this.chromeDriver
        .findElement(By.xpath('/html/body/div[2]/div[3]/ul/div[3]'))
        .click();
    await this.chromeDriver.sleep(3000);

});

When('Contratos2 | se selecciona Configurar Contrato, se abre el popup1 con título {string}', async function (string) {
    await this.chromeDriver
        .findElement(By.xpath('/html/body/div[1]/div/div/main/section/button'))
        .click();

    await this.chromeDriver.sleep(2000);

    const tituloPopup = await this.chromeDriver
        .findElement(By.xpath('/html/body/div[3]/div[3]/h6'))
        .getText()
    assert.strictEqual(tituloPopup, string);

});

When('Contratos2 | se busca el valor {string}, se selecciona la primer opción y Siguiente', async function (string) {
    await this.chromeDriver
        .findElement(By.xpath('/html/body/div[3]/div[3]/form/div/div/div/div/div/div/input'))
        .sendKeys(string);
    await this.chromeDriver.sleep(1000);

    await this.chromeDriver
        .findElement(By.xpath('/html/body/div[4]/div/ul/li'))
        .click();

    await this.chromeDriver
        .findElement(By.xpath('/html/body/div[3]/div[3]/form/button[2]'))
        .click();

    await this.chromeDriver.sleep(3500);

});

When('Contratos2 | se abre el popup2 mostrando la leyenda {string}', async function (string) {
    let inputText = await this.chromeDriver
        .findElement(By.xpath('/html/body/div[3]/div[3]/form/div/div[1]/label'))
        .getText()
    assert.strictEqual(inputText, string);

});

When('Contratos2 | dejando todas las opciones como están se presiona Guardar', async function () {
    await this.chromeDriver
        .findElement(By.xpath('/html/body/div[3]/div[3]/form/button[2]'))
        .click();

    await this.chromeDriver.sleep(1000);
});

When('Contratos2 | se debería mostrar la leyenda {string}', async function (string) {
    let txt = await this.chromeDriver
        .findElement(By.xpath('/html/body/div[3]/div[3]/form/div/div[4]/p'))
        .getText()
    assert.strictEqual(txt, string);

    this.closeChrome();
});


// 3)    ######   Scenario: Intentar configurar dejando los campos de tipo de templates vacíos   ######


When('Contratos3 | se accede a la página Contratos', async function () {
    await this.chromeDriver
    .findElement(By.xpath('//header//button'))
    .click();
    await this.chromeDriver.sleep(500)
    await this.chromeDriver
    .findElement(By.xpath('/html/body/div[2]/div[3]/ul/div[3]'))
    .click();
    await this.chromeDriver.sleep(3000);
    
});

When('Contratos3 | se selecciona Configurar Contrato, se abre el popup1 con el título {string}', async function (string) {
    await this.chromeDriver
    .findElement(By.xpath('/html/body/div[1]/div/div/main/section/button'))
    .click();
    
    await this.chromeDriver.sleep(2000);
    
    const tituloPopup = await this.chromeDriver
    .findElement(By.xpath('/html/body/div[3]/div[3]/h6'))
    .getText()
    assert.strictEqual(tituloPopup, string);
    
});

When('Contratos3 | se busca el valor {string}, se selecciona la primer opción y Siguiente', async function (string) {
    await this.chromeDriver
    .findElement(By.xpath('/html/body/div[3]/div[3]/form/div/div/div/div/div/div/input'))
    .sendKeys(string);
    await this.chromeDriver.sleep(500);
    
    await this.chromeDriver
    .findElement(By.xpath('/html/body/div[4]/div/ul/li'))
    .click();
    
    await this.chromeDriver
    .findElement(By.xpath('/html/body/div[3]/div[3]/form/button[2]'))
    .click();
    
    await this.chromeDriver.sleep(4000);
    
});

When('Contratos3 | se abre el popup2 mostrando la leyenda {string}', async function (string) {
    let inputText = await this.chromeDriver
    .findElement(By.xpath('/html/body/div[3]/div[3]/form/div/div[1]/label'))
    .getText()
    assert.strictEqual(inputText, string);
    
});    

When('Contratos3 | no se selecciona ningún tipo de Template, fecha válida y se presiona Guardar', async function () {
    
    await this.chromeDriver
    .findElement(By.xpath('/html/body/div[3]/div[3]/form/div/div[4]/div/div/div/div/div/input'))
    .click();
    await this.chromeDriver
    .findElement(By.xpath('/html/body/div[4]/div[3]/div/div/div/div/div[2]/button[2]'))
    .click();
    await this.chromeDriver
    .findElement(By.xpath('/html/body/div[4]/div[3]/div/div/div/table/tbody/tr[1]/td[5]/button'))
    .click();
    
    await this.chromeDriver.sleep(500);
    
    await this.chromeDriver
    .findElement(By.xpath('/html/body/div[3]/div[3]/form/button[2]'))
    .click();
    
    await this.chromeDriver.sleep(1000);
});

When('Contratos3 | se debería mostrar la leyenda {string}', async function (string) {
    let txt = await this.chromeDriver
        .findElement(By.xpath('/html/body/div[3]/div[3]/form/div/div[1]/p'))
        .getText()
    assert.strictEqual(txt, string);
    let txt2 = await this.chromeDriver
        .findElement(By.xpath('/html/body/div[3]/div[3]/form/div/div[2]/p'))
        .getText()
    assert.strictEqual(txt2, string);

    this.closeChrome();
});


//   try {
    //     await this.chromeDriver.sleep(2000);
    //     let crearContratoButton = await this.chromeDriver.findElement(
        //       By.xpath("//*[@id=\"btn-create-contratos\"]"),
        //     );
        
        //     await crearContratoButton.click();
//   } catch (error) {
//     throw new Error(error.message);
//   }
// });

// When("contratosTest2 se hace click en el desplegable", async function () {
//   try {
//     await this.chromeDriver.sleep(2000);
//     let desplegableContratos = await this.chromeDriver.findElement(
//       By.xpath("/html/body/div[3]/div[3]/form/div/div/div"),
//     );

//     await desplegableContratos.click();
//   } catch (error) {
//     throw new Error(error.message);
//   }
// });

// When("contratosTest2 selecciona una opcion", async function () {
//   try {
//     await this.chromeDriver.sleep(2000);
//     let desplegableOptionContratos = await this.chromeDriver.findElement(
//       By.xpath("//*[@id=\":r3:\"]/li[1]"),
//     );

//     await desplegableOptionContratos.click();
//   } catch (error) {
//     throw new Error(error.message);
//   }
// });

// When('contratosTest2 se hace click en el boton siguiente', async function () {
//   try {
//     await this.chromeDriver.sleep(2000);
//     let nextButton = await this.chromeDriver.findElement(By.xpath('//*[@id="nextButton"]'));

//     await nextButton.click();
//   } catch (error) {
//     throw new Error(error.message);
//   }
// });

// When('contratosTest2 se hace click en los desplegables de templates para seleccionarlos',
//   async function () {
//     try {
//       await this.chromeDriver.sleep(2000);
//       let firstSelect = await this.chromeDriver.findElement(
//         By.xpath("//*[@id=\"templateSentSelect\"]"),
//       );

//       await firstSelect.click();
//       let firstOption = await this.chromeDriver.findElement(By.xpath('//*[@id=":r4:"]/li[2]'));

//       await firstOption.click();

//       let secondSelect = await this.chromeDriver.findElement(
//         By.xpath("//*[@id=\"templateNoSentSelect\"]"),
//       );

//       await secondSelect.click();
//       let secondOption = await this.chromeDriver.findElement(By.xpath('//*[@id=":r5:"]/li[2]'));

//       await secondOption.click();
//     } catch (error) {
//       throw new Error(error.message);
//     }
//   },
// );

// When("contratosTest2 se hace click en el boton guardar", async function () {
//   try {
//     await this.chromeDriver.sleep(1000);
//     let saveButton = await this.chromeDriver.findElement(By.xpath('//*[@id="buttonNext"]'));

//     await saveButton.click();
//   } catch (error) {
//     throw new Error(error.message);
//   }
// });

// Then("se muestra modal de exito", async function () {
//   try {
//     let txt = "El Contrato fue creado con éxito ¡Muchas Gracias!";

//     await this.chromeDriver.sleep(1000);

// await this.chromeDriver
//   .findElement(By.xpath('/html/body/div[1]/div/div/main/div/h1'))
//   .getText()
//   .then(function (text) {
//     txt = text;
//   });

// assert.strictEqual(txt, string);
//});
