Feature: Verificar la página Contratos

    Como usuario, quiero verificar que la página "Contratos" funcione correctamente 
    respetando las funcionalidades especificadas por el cliente

Background:
            Given Background2 | habiendo iniciado sesión con el email "Test1@yopmail.com" y contraseña "Test1234" y estando en la página de bienvenida con la leyenda "Hola Juan Test1!"

    @ContratoPage @Contratos-1
    Scenario: Acceder a la página Templates 
        When Contratos1 | se hace click en el menu hamburguesa
        And Contratos1 | se hace click en la opción Contratos
        Then Contratos1 | se debería mostrar la leyenda "Configuracion de Contratos"
        And Contratos1 | se debería mostrar la tabla "Contratos"
    
    @ContratoPage @Contratos-2 @ConfigContratoFailed-1
    Scenario: Intentar configurar dejando los campos por default 
        When Contratos2 | se accede a la página Contratos
        And Contratos2 | se selecciona Configurar Contrato, se abre el popup1 con título "Configurar Contrato"
        And Contratos2 | se busca el valor "100000001", se selecciona la primer opción y Siguiente
        And Contratos2 | se abre el popup2 mostrando la leyenda "Template Entregado"
        And Contratos2 | dejando todas las opciones como están se presiona Guardar
        Then Contratos2 | se debería mostrar la leyenda "La fecha no puede ser menor o igual a la actual"
    
    @ContratoPage @Contratos-2 @ConfigContratoFailed-2
    Scenario: Intentar configurar dejando los campos de tipo de templates vacíos
        When Contratos3 | se accede a la página Contratos
        And Contratos3 | se selecciona Configurar Contrato, se abre el popup1 con el título "Configurar Contrato"
        And Contratos3 | se busca el valor "100000001", se selecciona la primer opción y Siguiente
        And Contratos3 | se abre el popup2 mostrando la leyenda "Template Entregado"
        And Contratos3 | no se selecciona ningún tipo de Template, fecha válida y se presiona Guardar
        Then Contratos3 | se debería mostrar la leyenda "Al menos un template es requerido"