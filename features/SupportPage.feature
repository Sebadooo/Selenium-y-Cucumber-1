Feature: Verificar la página Support

    Como usuario, quiero verificar que la página "Support" funcione correctamente 
    respetando las funcionalidades especificadas por el cliente

Background:
            Given Background3 | habiendo iniciado sesión con el email "Test1@yopmail.com" y contraseña "Test1234" y estando en la página de bienvenida con la leyenda "Hola Juan Test1!"

@SupportPage @Support-1
    Scenario: Acceder a la página Support 
        When support1 | se hace click en el menu hamburguesa
        And support1 | se hace click en la opción Support
        Then support1 | se debería mostrar la leyenda "Support"

@SupportPage @Support-2
Scenario: Dejar el input vacío
        When support2 | se accede a la página "Support" y se verifica el título
        And support2 | dejando el input vacío se selecciona Republicar
        Then support2 | se debería mostrar la leyenda "El código de envío es requerido."

@SupportPage @Support-3
Scenario: Enviar datos invalidos
        When support3 | se accede a la página "Support" y se verifica el título
        And support3 | se escribe "abcd1234" en el input y se selecciona Republicar
        Then support3 | se debería mostrar la leyenda "Ocurrió un error al republicar la constancia"
