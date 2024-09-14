
Feature: LogIn y Logout
    Como usuario web, quiero ingresar a la página inicial del sitio Constancias Electrónicas de Andreani, verificar que las páginas de
    Login rendericen correctamente, verificar las validaciones de seguridad de los campos y el login, verificar la página de bienvenida
    Y el proceso de logout mediante las dos opciones disponibles.

    Background:
        Given Background | estando en la página inicial de CE

    @AccountRelated @login @login-1
    Scenario: LogIn simple
        When login1 | se presiona el boton Iniciar sesión
        Then login1 | se debería mostrar la leyenda "Que bueno que estés acá"

    @AccountRelated @login @login-2
    Scenario: LogIn failed email not found
        When login2 | se presiona el boton Iniciar sesión, se redirecciona a una nueva página
        And login2 | se ingresa el email "TestFailed@yopmail.com"
        And login2 | se ingresa la Contraseña "Test1234"
        And login2 | se presiona el boton Iniciar sesión
        Then login2 | se debería mostrar la leyenda "El usuario y/o contraseña son incorrectas."

    @AccountRelated @login @login-3
    Scenario: LogIn failed invalid email format
        When login3 | se presiona el boton Iniciar sesión, se redirecciona a una nueva página
        And login3  | se ingresa el email "Test1yopmail.com"
        And login3  | se ingresa la Contraseña "Test1234"
        And login3  | se presiona el boton Iniciar sesión
        Then login3  | se debería mostrar la leyenda "Parece que no podemos encontrar su cuenta."

    @AccountRelated @login @login-4
    Scenario: LogIn failed wrong password
        When login4 | se presiona el boton Iniciar sesión, se redirecciona a una nueva página
        And login4 | se ingresa el email "Test1@yopmail.com"
        And login4 | se ingresa la Contraseña "12345678"
        And login4 | se presiona el boton Iniciar sesión
        Then login4 | se debería mostrar la leyenda "El usuario y/o contraseña son incorrectas."

    @AccountRelated @login @login-5
    Scenario: LogIn failed Empty email
        When login5 | se presiona el boton Iniciar sesión, se redirecciona a una nueva página
        And login5 | se ingresa la Contraseña "Test1234"
        And login5 | se presiona el boton Iniciar sesión
        Then login5 | se debería mostrar la leyenda "Ingrese su Email para continuar"

    @AccountRelated @login @login-6
    Scenario: LogIn failed Empty password
        When login6 | se presiona el boton Iniciar sesión, se redirecciona a una nueva página
        And login6 | se ingresa el email "TestFailed@yopmail.com"
        And login6 | se presiona el boton Iniciar sesión
        Then login6 | se debería mostrar la leyenda "Ingrese su contraseña para continuar"

    @AccountRelated @login @login-7
    Scenario: LogIn succesfully
        When login7 | se presiona el boton Iniciar sesión, se redirecciona a una nueva página
        And login7 | se ingresa el email "Test1@yopmail.com"
        And login7 | se ingresa la Contraseña "Test1234"
        And login7 | se presiona el boton Iniciar sesión
        Then login7 | se debería mostrar la leyenda "Hola Juan Test1!"

    @AccountRelated @logout @logout-1
    Scenario: Logout from user name
        When logout1 | se inicia sesión correctamente en la página de CE con las credenciales email "Test1@yopmail.com" y Contraseña "Test1234"
        And logout1 | se hace click sobre la leyenda Cerrar sesión
        Then logout1 | se debería volver a la página inicial y ver "Por favor inicia sesión para ver la información de usuario."

    @AccountRelated @logout @logout-2
    Scenario: Logout from burger menu
        When logout2 | se inicia sesión correctamente en la página de CE con las credenciales email "Test1@yopmail.com" y Contraseña "Test1234"
        And logout2 | se hace click en el menu hamburguesa
        And logout2 | se selecciona la opción Cerrar sesión
        Then logout2 | se debería volver a la página inicial y ver "Por favor inicia sesión para ver la información de usuario."