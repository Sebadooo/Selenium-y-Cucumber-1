const { Given, When, Then, And } = require("@cucumber/cucumber");
const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");


//     ######   Background   ###### 


Given('Background1 | habiendo iniciado sesión con el email {string} y contraseña {string} y estando en la página de bienvenida con la leyenda {string}',
  { timeout: 20000 },
  async function (email, pass, string) {
    await this.openChrome("https://templates-ui-constancias-qa.apps.ocpqa.andreani.com.ar/");
    await this.chromeDriver
      .findElement(By.xpath('/html/body/div[1]/div/div/header/div/div[2]/div/div[2]/span[1]'))
      .click();

    await this.chromeDriver.sleep(3000);

    // Login
    let campoEmail = await this.chromeDriver
      .findElement(By.xpath('/html/body/div[2]/div[2]/div[2]/form/div[3]/div[1]/input'))
    campoEmail.click()
    campoEmail.sendKeys(email);

    let campoPass = await this.chromeDriver
      .findElement(By.xpath("/html/body/div[2]/div[2]/div[2]/form/div[3]/div[2]/input"))
    campoPass.click()
    campoPass.sendKeys(pass);

    await this.chromeDriver.sleep(500)

    let loginButton = await this.chromeDriver
      .findElement(By.xpath("/html/body/div[2]/div[2]/div[2]/form/div[3]/div[5]/button"))
    loginButton.click();

    await this.chromeDriver.sleep(7500)

    // Se comprueba que se muestre el texto "Hola Juan Test1!" 
    let txt = await this.chromeDriver
      .findElement(By.xpath("/html/body/div[1]/div/div/main/div/h1"))
      .getText()
      assert.strictEqual(txt, string);
  });


// 1)    ######   Scenario: Acceder a la página Templates   ###### 


When('templates1 | se hace click en el menu hamburguesa', async function () {
  await this.chromeDriver.sleep(3000)

  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[1]/div/div/header/div/div[1]/button'))
    .click()
});

When('templates1 | se hace click en la opción Templates', async function () {
  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[2]/div[3]/ul/div[2]/div[2]/div'))
    .click()
});

Then('templates1 | se debería mostrar la leyenda {string}', async function (string) {
  await this.chromeDriver.sleep(4500);

  let txt = await this.chromeDriver
    .findElement(By.xpath('/html/body/div[1]/div/div[1]/main/h1'))
    .getText()
    assert.strictEqual(txt, string);

  this.closeChrome();
});


// 2)    ######   Scenario: Crear nuevo template Happy path 1   ######


When('templates2 | se accede a la página Templates', { timeout: 10000 }, async function () {
  await this.chromeDriver.sleep(2000)
  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[1]/div/div/header/div/div[1]/button'))
    .click();

  // Se verifica que se muestre el título "Templates"
  let selectTemplates = await this.chromeDriver
    .findElement(By.xpath('/html/body/div[2]/div[3]/ul/div[2]/div[2]/div'))
  selectTemplates.click();
});

When('templates2 | se selecciona el boton Crear Template', async function () {
  await this.chromeDriver.sleep(4500)
  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[1]/div/div/main/section/button/h6'))
    .click();
});

When('templates2 | se abre el popup1 mostrando la leyenda {string}', async function (string) {
  await this.chromeDriver.sleep(1000)
  // Se verifica que se muestre el título "Crear Nuevo Template"
  let txt = await this.chromeDriver
    .findElement(By.xpath('/html/body/div[3]/div[3]/h6'))
    .getText()
    assert.strictEqual(txt, string);
});

When('templates2 | se completa campo Nombre con {string}, se selecciona Tipo Entregado y Siguiente', async function (string,) {
  let nombreTemplate = await this.chromeDriver
    .findElement(By.xpath('/html/body/div[3]/div[3]/form/div[1]/div/input'))
  nombreTemplate.click()
  nombreTemplate.sendKeys(string);
  // Se despliega el Dropdown
  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[3]/div[3]/form/div[2]/div/div'))
    .click();
  // Se selecciona "Entregado"
  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[4]/div[3]/ul/li[1]'))
    .click();
  // Se hace click en "Siguiente"
  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[3]/div[3]/form/button[2]'))
    .click();
});

When('templates2 | se abre el popup2 mostrando la leyenda {string}', async function (string) {
  await this.chromeDriver.sleep(2000)
  //Se verifica si "Disponibles" esta presente
  let txt = await this.chromeDriver
    .findElement(By.xpath('/html/body/div[3]/div[3]/form/div/div[1]/h2[1]'))
    .getText()
    assert.strictEqual(txt, string);
});

When('templates2 | se asignan 3 modulos y se presiona Guardar', async function () {
  // Se tilda módulo #1
  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[3]/div[3]/form/div/div[2]/div[1]/div/div/div[1]/div[2]/span'))
    .click();
  // Se tilda módulo #2
  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[3]/div[3]/form/div/div[2]/div[1]/div/div/div[2]/div[2]/span'))
    .click();
  // Se tilda módulo #3
  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[3]/div[3]/form/div/div[2]/div[1]/div/div/div[3]/div[2]/span'))
    .click();
  // Click en la flecha simple para asignar
  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[3]/div[3]/form/div/div[2]/div[2]/div/button[2]'))
    .click();
  // Se hace click en "Guardar"
  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[3]/div[3]/form/div/button[3]'))
    .click();

});

Then('templates2 | se debería mostrar el nuevo Template {string} en la lista', { timeout: 10000 }, async function (string) {
  await this.chromeDriver.sleep(2000)
  let busqueda1 = await this.chromeDriver
    .findElement(By.xpath('/html/body/div[1]/div/div/main/div[1]/section[1]/div/div/input'))
  busqueda1.click()
  busqueda1.sendKeys(string);
  //Se despliega el campo de "Tipo de Constancia"
  let busqueda2 = await this.chromeDriver
    .findElement(By.xpath('/html/body/div[1]/div/div/main/div[1]/section[2]/div/div/div'))
  busqueda2.click()
  await this.chromeDriver.sleep(1000)
  //Se selecciona la opción "Entregado"
  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[1]/div/div/main/div[1]/section[2]/div/div/div[2]/div[3]/ul/li[1]'))
    .click()
  //Se selecciona la lupita
  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[1]/div/div/main/div[1]/span/button'))
    .click()
  // Se verifica si el texto "AutoTest 1" este presente en el listado
  await this.chromeDriver.sleep(4000)
  let txt = await this.chromeDriver
    .findElement(By.xpath('/html/body/div[1]/div/div/main/div[3]/table/tbody'))
    .getText();
  assert(txt.includes(string), `El texto {string} no está presente en la página`);

  this.closeChrome();
});


// 3)    ######   Scenario: Crear nuevo template Happy path 2   ######


When('templates3 | se accede a la página Templates', { timeout: 10000 }, async function () {
  await this.chromeDriver.sleep(2000)
  // Click en el menú hamburguesa
  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[1]/div/div/header/div/div[1]/button'))
    .click();
  // Click en la opción "Templates"
  let selectTemplates = await this.chromeDriver
    .findElement(By.xpath('/html/body/div[2]/div[3]/ul/div[2]/div[2]/div'))
  selectTemplates.click();
});

When('templates3 | se selecciona el boton Crear Template', async function () {
  await this.chromeDriver.sleep(4500)
  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[1]/div/div/main/section/button/h6'))
    .click();

});

When('templates3 | se abre el popup1 mostrando la leyenda {string}', async function (string) {
  await this.chromeDriver.sleep(1000)
  // Verificar que se muestre el título "Crear Nuevo Template"
  let txt = await this.chromeDriver
    .findElement(By.xpath('/html/body/div[3]/div[3]/h6'))
    .getText()
  assert.strictEqual(txt, string);
});

When('templates3 | se completa campo Nombre con {string}, se selecciona Tipo No Entregado y Siguiente', async function (string,) {
  let nombreTemplate = await this.chromeDriver
    .findElement(By.xpath('/html/body/div[3]/div[3]/form/div[1]/div/input'))
  nombreTemplate.click()
  nombreTemplate.sendKeys(string);
  // Se despliega el dropdown
  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[3]/div[3]/form/div[2]/div/div'))
    .click();
  // Se selecciona la opción "No Entregado"
  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[4]/div[3]/ul/li[2]'))
    .click();
  // Se hace click en "Siguiente"
  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[3]/div[3]/form/button[2]'))
    .click();
});

When('templates3 | se abre el popup2 mostrando la leyenda {string}', async function (string) {
  await this.chromeDriver.sleep(2000)
  // Se verifica que se muestre el texto "Disponibles"
  let txt = await this.chromeDriver
    .findElement(By.xpath('/html/body/div[3]/div[3]/form/div/div[1]/h2[1]'))
    .getText()
  assert.strictEqual(txt, string);
});

When('templates3 | se asignan todos los modulos con la flecha doble y se presiona Guardar', async function () {
  // Se asignan todos los módulos con la flecha doble
  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[3]/div[3]/form/div/div[2]/div[2]/div/button[1]'))
    .click();
  // Se selecciona "Guardar"
  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[3]/div[3]/form/div/button[3]'))
    .click();
});

Then('templates3 | se debería mostrar el nuevo Template {string} en la lista', { timeout: 15000 }, async function (string) {
  // Se verifica si el texto "AutoTest 2" este presente en el listado
  await this.chromeDriver.sleep(10000)
  let busqueda1 = await this.chromeDriver
    .findElement(By.xpath('/html/body/div[1]/div/div/main/div[1]/section[1]/div/div/input'))
  busqueda1.click()
  busqueda1.sendKeys(string);
  //Se despliega el campo de "Tipo de Constancia"
  let busqueda2 = await this.chromeDriver
    .findElement(By.xpath('/html/body/div[1]/div/div/main/div[1]/section[2]/div/div/div'))
  busqueda2.click()
  await this.chromeDriver.sleep(1000)
  //Se selecciona la opción "No Entregado"
  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[1]/div/div/main/div[1]/section[2]/div/div/div[2]/div[3]/ul/li[2]'))
    .click()
  //Se selecciona la lupita
  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[1]/div/div/main/div[1]/span/button'))
    .click()
  // Se verifica si el texto "AutoTest 2" este presente en el listado
  await this.chromeDriver.sleep(3000)
  let tableText = await this.chromeDriver
    .findElement(By.xpath('/html/body/div[1]/div/div/main/div[3]/table/tbody'))
    .getText();
  assert(tableText.includes(string), `El texto {string} no está presente en la página`);

  this.closeChrome();
});


// 4)    ######   Scenario: Editar template 1   ######


When('templates4 | se accede a la página Templates', { timeout: 10000 }, async function () {
  await this.chromeDriver.sleep(2000)

  // Se hace click en el menu hamburguesa
  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[1]/div/div/header/div/div[1]/button'))
    .click();
  // Se selecciona la opción "Templates"
  let selectTemplates = await this.chromeDriver
    .findElement(By.xpath('/html/body/div[2]/div[3]/ul/div[2]/div[2]/div'))
  selectTemplates.click();
});

When('templates4 | se verifica la presencia del Template {string} y se selecciona el lapiz para editarlo', { timeout: 10000 }, async function (string) {

  await this.chromeDriver.sleep(2000)

  let busqueda1 = await this.chromeDriver
    .findElement(By.xpath('/html/body/div[1]/div/div/main/div[1]/section[1]/div/div/input'))
  busqueda1.click()
  busqueda1.sendKeys(string);
  //Se despliega el campo de "Tipo de Constancia"
  let busqueda2 = await this.chromeDriver
    .findElement(By.xpath('/html/body/div[1]/div/div/main/div[1]/section[2]/div/div/div'))
  busqueda2.click()

  await this.chromeDriver.sleep(2000)

  //Se selecciona la opción "Entregado"
  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[1]/div/div/main/div[1]/section[2]/div/div/div[2]/div[3]/ul/li[1]'))
    .click()
  //Se selecciona la lupita
  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[1]/div/div/main/div[1]/span/button'))
    .click()
  await this.chromeDriver.sleep(2000)
  //Chequea primer lugar en la lista
  let txt = await this.chromeDriver
    .findElement(By.xpath('/html/body/div[1]/div/div/main/div[3]/table/tbody/tr[1]/td[1]'))
    .getText()
  assert.strictEqual(txt, string);

  //Selecciona lapicito de edición
  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[1]/div/div/main/div[3]/table/tbody/tr/td[3]/button[1]'))
    .click();

  await this.chromeDriver.sleep(1000);

  //Verifica el título del popup
  let txt2 = await this.chromeDriver
    .findElement(By.xpath('/html/body/div[3]/div[3]/h2'))
    .getText()
  assert.strictEqual(txt2, "Editar Template AutoTest 1");
});

// Escribir el nuevo nombre
When('templates4 | se agrega al campo Nombre {string}, se cambia el Tipo a No Entregado y Siguiente', async function (string,) {
  let nombreTemplate = await this.chromeDriver
    .findElement(By.xpath('/html/body/div[3]/div[3]/form/div[1]/div/input'))
  nombreTemplate.click()
  nombreTemplate.sendKeys(string);

  // Click desplegar combobox
  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[3]/div[3]/form/div[2]/div/div'))
    .click();
  //Click opcion "No Entregado"
  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[4]/div[3]/ul/li[2]'))
    .click();
  // Click en "Siguiente"
  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[3]/div[3]/form/button[2]'))
    .click();
});

When('templates4 | se abre el popup2 mostrando la leyenda {string}', async function (string) {
  await this.chromeDriver.sleep(1000)
  //Se verifica título "Disponibles"
  let txt = await this.chromeDriver
    .findElement(By.xpath('/html/body/div[3]/div[3]/form/div[1]/h2[1]'))
    .getText()
  assert.strictEqual(txt, string);
});

When('templates4 | se desasignan los modulos, asignan nuevos y se presiona Guardar', async function () {
  // Desasignar todos los módulos
  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[3]/div[3]/form/div[2]/div[2]/div/button[4]'))
    .click();
  // Se selecciona módulo #1
  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[3]/div[3]/form/div[2]/div[1]/div/div/div[1]/div[2]'))
    .click();
  // Se selecciona módulo #2
  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[3]/div[3]/form/div[2]/div[1]/div/div/div[2]/div[2]'))
    .click();
  // Se selecciona módulo #3
  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[3]/div[3]/form/div[2]/div[1]/div/div/div[3]/div[2]'))
    .click();
  // Se asignan los módulos con la flecha simple
  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[3]/div[3]/form/div[2]/div[2]/div/button[2]'))
    .click();
  await this.chromeDriver.sleep(1000)
  //Seleccionar "Guardar"
  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[3]/div[3]/form/button[4]'))
    .click();
});


Then('templates4 | se debería mostrar el Template en la lista con el nombre {string}', { timeout: 10000 }, async function (string) {
  await this.chromeDriver.sleep(2000)
  // Se despliega el campo de "Tipo de Constancia"
  let busqueda2 = await this.chromeDriver
    .findElement(By.xpath('/html/body/div[1]/div/div/main/div[1]/section[2]/div/div'))
  busqueda2.click()

  await this.chromeDriver.sleep(1000)

  // Se selecciona la opción "No Entregado"
  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[1]/div/div/main/div[1]/section[2]/div/div/div[2]/div[3]/ul/li[2]'))
    .click()
  // Se selecciona la lupita
  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[1]/div/div/main/div[1]/span/button'))
    .click()

  await this.chromeDriver.sleep(5000)

  // Se verifica que el texto "AutoTest 1 Editado" este presente en la lista
  let txt = await this.chromeDriver
      .findElement(By.xpath('/html/body/div[1]/div/div/main/div[3]/table/tbody'))
      .getText()
  assert(txt.includes(string), `El texto {string} no está presente en la página`);

  this.closeChrome();
});

// 5)    ######   Scenario: Editar template 2   ######

When('templates5 | se accede a la página Templates', { timeout: 10000 }, async function () {
  await this.chromeDriver.sleep(2000)
  // Se selecciona el menú hamburguesa
  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[1]/div/div/header/div/div[1]/button'))
    .click();
  // Se selecciona la opción "Templates"
  let selectTemplates = await this.chromeDriver
    .findElement(By.xpath('/html/body/div[2]/div[3]/ul/div[2]/div[2]/div'))
  selectTemplates.click();
});

When('templates5 | se verifica la presencia del Template {string} y se selecciona el lapiz para editarlo', { timeout : 10000 } ,async function (string) {
  await this.chromeDriver.sleep(2000)

  let busqueda1 = await this.chromeDriver
  .findElement(By.xpath('/html/body/div[1]/div/div/main/div[1]/section[1]/div/div/input'))
busqueda1.click()
busqueda1.sendKeys(string);
//Se despliega el campo de "Tipo de Constancia"
let busqueda2 = await this.chromeDriver
  .findElement(By.xpath('/html/body/div[1]/div/div/main/div[1]/section[2]/div/div/div'))
busqueda2.click()

await this.chromeDriver.sleep(1000)

//Se selecciona la opción "No Entregado"
await this.chromeDriver
.findElement(By.xpath('/html/body/div[1]/div/div/main/div[1]/section[2]/div/div/div[2]/div[3]/ul/li[2]'))
.click()

await this.chromeDriver.sleep(1000)

//Se selecciona la lupita
await this.chromeDriver
  .findElement(By.xpath('/html/body/div[1]/div/div/main/div[1]/span/button'))
  .click()
await this.chromeDriver.sleep(3000)

// Se verifica que el texto "AutoTest 2" esté presente en la lista
let txt = await this.chromeDriver
.findElement(By.xpath('/html/body/div[1]/div/div/main/div[3]/table/tbody'))
.getText()
assert(txt.includes(string), `El texto {string} no está presente en la página`);

// Se hace click en el lapiz para editar el template
await this.chromeDriver
.findElement(By.xpath('/html/body/div[1]/div/div/main/div[3]/table/tbody/tr[1]/td[3]/button[1]'))
.click();
});

When('templates5 | se agrega al campo Nombre {string}, se cambia el Tipo a Entregado y Siguiente', async function (string,) {
  await this.chromeDriver.sleep(2000)
  // Se agrega " Editado" al campo Nombre
  let nombreTemplate = await this.chromeDriver
    .findElement(By.xpath('/html/body/div[3]/div[3]/form/div[1]/div/input'))
  nombreTemplate.click()
  nombreTemplate.sendKeys(string);

  await this.chromeDriver
  // Se despliega el combobox de Tipo
    .findElement(By.xpath('/html/body/div[3]/div[3]/form/div[2]/div/div')) 
    .click();
  // Se selecciona "Entregado"
  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[4]/div[3]/ul/li[1]'))
    .click();
  // Se selecciona "Siguiente"
  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[3]/div[3]/form/button[2]')) 
    .click();
});

When('templates5 | se abre el popup2 mostrando la leyenda {string}', async function (string) {
  await this.chromeDriver.sleep(2000)
  // Se verifica la presencia del título "Disponibles"
  let txt = await this.chromeDriver
    .findElement(By.xpath('/html/body/div[3]/div[3]/form/div[1]/h2[1]')) 
    .getText()
  assert.strictEqual(txt, string);
});

When('templates5 | se desasignan los modulos, asignan nuevos y se presiona Guardar', async function () {
  await this.chromeDriver
    // Se desasignan todos los módulos con la flecha doble a la izquierda
    .findElement(By.xpath('/html/body/div[3]/div[3]/form/div[2]/div[2]/div/button[4]'))  
    .click();
  // Se selecciona el módulo de Geolocalización solamente
  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[3]/div[3]/form/div[2]/div[1]/div/div/div[1]'))  
    .click();
  // Se asigna el módulo con la flecha simple a la derecha
  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[3]/div[3]/form/div[2]/div[2]/div/button[2]'))  
    .click();
    // Se selecciona el "Guardar"
  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[3]/div[3]/form/button[4]'))
    .click();
    await this.chromeDriver.sleep(2000)
});

Then('templates5 | se debería mostrar el Template en la lista con el nombre {string}', {timeout : 15000 }, async function (string) {
  await this.chromeDriver.sleep(9000)
  // Se despliega el campo de "Tipo de Constancia"
  let busqueda2 = await this.chromeDriver
    .findElement(By.xpath('/html/body/div[1]/div/div/main/div[1]/section[2]/div/div'))
  busqueda2.click()

  await this.chromeDriver.sleep(1000)

  // Se selecciona la opción "Entregado"
  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[1]/div/div/main/div[1]/section[2]/div/div/div[2]/div[3]/ul/li[1]'))
    .click()
  // Se selecciona la lupita
  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[1]/div/div/main/div[1]/span/button'))
    .click()

  await this.chromeDriver.sleep(2000)

  // Se verifica que el texto "AutoTest 2 Editado" este presente en la lista
  let txt = await this.chromeDriver
      .findElement(By.xpath('/html/body/div[1]/div/div/main/div[3]/table/tbody'))
      .getText()
  assert(txt.includes(string), `El texto {string} no está presente en la página`);

  this.closeChrome();
});


// 6)    ######   Scenario: Buscar y Eliminar template 1   ######


When('templates6 | se accede a la página Templates', { timeout: 10000 }, async function () {
  await this.chromeDriver.sleep(2000)
  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[1]/div/div/header/div/div[1]/button'))
    .click();

  let selectTemplates = await this.chromeDriver
    .findElement(By.xpath('/html/body/div[2]/div[3]/ul/div[2]/div[2]/div'))
  selectTemplates.click();
});

When('templates6 | se hace una busqueda de Nombre {string}, Tipo No Entregado y se presiona la lupa', async function (string) {
  await this.chromeDriver.sleep(2000)
  //Se ingresa el texto en el campo de búsqueda
  let busqueda1 = await this.chromeDriver
    .findElement(By.xpath('/html/body/div[1]/div/div/main/div[1]/section[1]/div/div/input'))
  busqueda1.click()
  busqueda1.sendKeys(string);
  //Se despliega el campo de "Tipo de Constancia"
  let busqueda2 = await this.chromeDriver
    .findElement(By.xpath('/html/body/div[1]/div/div/main/div[1]/section[2]/div/div/div'))
  busqueda2.click()
  await this.chromeDriver.sleep(2000)
  //Se selecciona la opción "No Entregado"
  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[1]/div/div/main/div[1]/section[2]/div/div/div[2]/div[3]/ul/li[2]'))
    .click()
  //Se selecciona la lupita
  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[1]/div/div/main/div[1]/span/button'))
    .click()
});

When('templates6 | se debería obtener como resultado {string} y se presiona la X para eliminarlo', { timeout: 10000 }, async function (string) {
  await this.chromeDriver.sleep(4000)

  let txt =
    await this.chromeDriver
      .findElement(By.xpath('/html/body/div[1]/div/div/main/div[3]/table/tbody'))
      .getText()
  assert(txt.includes(string), `El texto {string} no está presente en la página`);

  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[1]/div/div/main/div[3]/table/tbody/tr/td[3]/button[2]'))
    .click();
});

When('templates6 | se debe mostrar un popup con la leyenda {string} y se selecciona Aceptar', async function (string) {
  await this.chromeDriver.sleep(2000)
  //Verificar título popup "Confirmar Eliminación"
  let txt = await this.chromeDriver
    .findElement(By.xpath('/html/body/div[3]/div[3]/div/div[1]/h2'))
    .getText()
  assert.strictEqual(txt, string);

  //Seleccionar Aceptar
  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[3]/div[3]/div/div[2]/button[2]'))
    .click();

  });
  
  Then('templates6 | se debería mostrar la leyenda {string}', { timeout: 10000 }, async function (string) {
  await this.chromeDriver.sleep(2000);
  // Se verifica la notificación de proceso exitoso
  let deleteConfirm = await this.chromeDriver
  .findElement(By.xpath('/html/body/div[1]/div/div[2]'))
  .getText()
  assert.strictEqual(deleteConfirm, string);
  
  await this.chromeDriver.sleep(7000)
  });

  Then('templates6 | el template {string} ya no debería estar en la lista', async function (string) {
    // Se verifica que el template "AutoTest 1 Editado" NO aparazca en la lista
    let txt = await this.chromeDriver
      .findElement(By.xpath('/html/body/div[1]/div/div/main/div[3]/table/tbody/tr[1]/td[1]'))
      .getText()
  assert.notEqual(txt, string);

  this.closeChrome();
});

// 7)    ######   Scenario: Buscar y Eliminar template 2   ######

When('templates7 | se accede a la página Templates', { timeout: 10000 }, async function () {
  await this.chromeDriver.sleep(2000)
  // Se hace click en el menú hamburguesa
  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[1]/div/div/header/div/div[1]/button'))
    .click();
  // Se selecciona la opción Templates
  let selectTemplates = await this.chromeDriver
    .findElement(By.xpath('/html/body/div[2]/div[3]/ul/div[2]/div[2]/div'))
  selectTemplates.click();
});

When('templates7 | se hace una busqueda de Nombre {string}, Tipo Entregado y se presiona la lupa', async function (string) {
  await this.chromeDriver.sleep(2500)
  // Se ingresa "AutoTest2 editado" en el campo Nombre
  let busqueda1 = await this.chromeDriver
    .findElement(By.xpath('/html/body/div[1]/div/div/main/div[1]/section[1]/div/div/input'))
  busqueda1.click()
  busqueda1.sendKeys(string);
  // Se despliega el combobox de Tipo
  await this.chromeDriver.sleep(1000)
  let busqueda2 = await this.chromeDriver
  .findElement(By.xpath('/html/body/div[1]/div/div/main/div[1]/section[2]/div/div/div'))
  busqueda2.click()
  // Se selecciona "Entregado"
  await this.chromeDriver.sleep(1000)
  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[1]/div/div/main/div[1]/section[2]/div/div/div[2]/div[3]/ul/li[1]'))
    .click()
  // Se selecciona la lupita
  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[1]/div/div/main/div[1]/span/button'))
    .click()
});

When('templates7 | se debería obtener como resultado {string} y se presiona la X para eliminarlo', async function (string) {
  await this.chromeDriver.sleep(4500)
  // Se verifica que resultado de busqueda sea "AutoTest 2 Editado"
  let txt = await this.chromeDriver
    .findElement(By.xpath('/html/body/div[1]/div/div/main/div[3]/table/tbody/tr[1]/td[1]'))
    .getText()
  assert(txt.includes(string), `El texto {string} no está presente en la página`);

  // Se presiona la cruz de eliminación de la fila
  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[1]/div/div/main/div[3]/table/tbody/tr[1]/td[3]/button[2]'))
    .click();
});

When('templates7 | se debe mostrar un popup con la leyenda {string} y se selecciona Aceptar', async function (string) {
  await this.chromeDriver.sleep(1000)
  // Se verifica que el título del popup sea "Confirmar Eliminación"
  let txt = await this.chromeDriver
    .findElement(By.xpath('/html/body/div[3]/div[3]/div/div[1]/h2')) //Verficar Xpath
    .getText()
  assert.strictEqual(txt, string);

  // Se selecciona "Aceptar"
  await this.chromeDriver
    .findElement(By.xpath('/html/body/div[3]/div[3]/div/div[2]/button[2]'))
    .click();
});

Then('templates7 | se debería mostrar la leyenda {string}', { timeout: 10000 }, async function (string) {
  await this.chromeDriver.sleep(2000);
  // Se verifica la notificación de proceso exitoso
  let deleteConfirm = await this.chromeDriver
  .findElement(By.xpath('/html/body/div[1]/div/div[2]'))
  .getText()
  assert.strictEqual(deleteConfirm, string);
  
  await this.chromeDriver.sleep(7000)
});

Then('templates7 | el template {string} ya no debería estar en la lista', async function (string) {
  // Se verifica que el template "AutoTest 2 Editado" NO aparazca en la lista
  let txt = await this.chromeDriver
    .findElement(By.xpath('/html/body/div[1]/div/div/main/div[3]/table/tbody/tr[1]/td[1]'))
    .getText()
  assert.notEqual(txt, string);

  this.closeChrome();
});
