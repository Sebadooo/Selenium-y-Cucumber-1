Feature: Verificar la página Templates

    Como usuario, quiero verificar que la página "Templates" funcione correctamente 
    respetando las funcionalidades especificadas por el cliente

Background:
            Given Background1 | habiendo iniciado sesión con el email "Test1@yopmail.com" y contraseña "Test1234" y estando en la página de bienvenida con la leyenda "Hola Juan Test1!"

    @TemplatePage @Template-1
    Scenario: Acceder a la página Templates 
        When templates1 | se hace click en el menu hamburguesa
        And templates1 | se hace click en la opción Templates
        Then templates1 | se debería mostrar la leyenda "Templates"

    @TemplatePage @Template-2 @CreateTemplate-1
    Scenario: Crear nuevo template Happy path 1
        When templates2 | se accede a la página Templates
        And templates2 | se selecciona el boton Crear Template
        And templates2 | se abre el popup1 mostrando la leyenda "Crear Nuevo Template"
        And templates2 | se completa campo Nombre con "AutoTest 1", se selecciona Tipo Entregado y Siguiente
        And templates2 | se abre el popup2 mostrando la leyenda "Disponibles"
        And templates2 | se asignan 3 modulos y se presiona Guardar
        Then templates2 | se debería mostrar el nuevo Template "AutoTest 1" en la lista

    @TemplatePage @Template-3 @CreateTemplate-2
    Scenario: Crear nuevo template Happy path 2
        When templates3 | se accede a la página Templates
        And templates3 | se selecciona el boton Crear Template
        And templates3 | se abre el popup1 mostrando la leyenda "Crear Nuevo Template"
        And templates3 | se completa campo Nombre con "AutoTest 2", se selecciona Tipo No Entregado y Siguiente
        And templates3 | se abre el popup2 mostrando la leyenda "Disponibles"
        And templates3 | se asignan todos los modulos con la flecha doble y se presiona Guardar
        Then templates3 | se debería mostrar el nuevo Template "AutoTest 2" en la lista 

    @TemplatePage @Template-2 @EditTemplate-1
    Scenario: Editar template 1
        When templates4 | se accede a la página Templates
        And templates4 | se verifica la presencia del Template "AutoTest 1" y se selecciona el lapiz para editarlo
        And templates4 | se agrega al campo Nombre " Editado", se cambia el Tipo a No Entregado y Siguiente
        And templates4 | se abre el popup2 mostrando la leyenda "Disponibles"
        And templates4 | se desasignan los modulos, asignan nuevos y se presiona Guardar
        Then templates4 | se debería mostrar el Template en la lista con el nombre "AutoTest 1 Editado"

    @TemplatePage @Template-3 @EditTemplate-2
    Scenario: Editar template 2
        When templates5 | se accede a la página Templates
        And templates5 | se verifica la presencia del Template "AutoTest 2" y se selecciona el lapiz para editarlo
        And templates5 | se agrega al campo Nombre " Editado", se cambia el Tipo a Entregado y Siguiente
        And templates5 | se abre el popup2 mostrando la leyenda "Disponibles"
        And templates5 | se desasignan los modulos, asignan nuevos y se presiona Guardar
        Then templates5 | se debería mostrar el Template en la lista con el nombre "AutoTest 2 Editado"
        
    @TemplatePage @Template-2 @DeleteTemplate-1
    Scenario: Buscar y Eliminar template 1
        When templates6 | se accede a la página Templates
        And templates6 | se hace una busqueda de Nombre "AutoTest 1 Editado", Tipo No Entregado y se presiona la lupa
        And templates6 | se debería obtener como resultado "AutoTest 1 Editado" y se presiona la X para eliminarlo
        And templates6 | se debe mostrar un popup con la leyenda "Confirmar Eliminación" y se selecciona Aceptar
        Then templates6 | se debería mostrar la leyenda "El Template fue eliminado con éxito!"
        And templates6 | el template "AutoTest 1 Editado" ya no debería estar en la lista
        
    @TemplatePage @Template-3 @DeleteTemplate-2
    Scenario: Buscar y Eliminar template 2
        When templates7 | se accede a la página Templates
        And templates7 | se hace una busqueda de Nombre "AutoTest 2 Editado", Tipo Entregado y se presiona la lupa
        And templates7 | se debería obtener como resultado "AutoTest 2 Editado" y se presiona la X para eliminarlo
        And templates7 | se debe mostrar un popup con la leyenda "Confirmar Eliminación" y se selecciona Aceptar
        Then templates7 | se debería mostrar la leyenda "El Template fue eliminado con éxito!"
        And templates7 | el template "AutoTest 2 Editado" ya no debería estar en la lista
        
