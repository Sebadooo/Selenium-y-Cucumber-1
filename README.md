1. Crear un proyecto node
   npm init -y

2. Instalar Typescript global
   pnpm i -D typescript --global

3. Generar el archivo de configuración de Typescript
   tsc --init

4. Instalar Cucumber
   pnpm i -D @cucumber/cucumber

5. Instalar jest
   pnpm add --save-dev jest

6. run the cucumber-js command
   ./node_modules/.bin/cucumber-js

7. Edit package.json and change the test line under the scripts from it’s default to cucumber-js
   "scripts": {
   "test": "cucumber-js features"
   },

8. run test
   npm run test

9. Instalar servidor http
   npm i -D http-server

10. Instalar selenium
    npm i -D selenium-webdriver

11. Instalar chromedriver
    npm i -D chromedriver --global

12. Run server
    ./node_modules/.bin/http-server -p 8090 ./web

13. Edit package.json
    "scripts": {
    "test": "cucumber-js features",
    "server": "http-server -p 8090 ./web"
    },

14. Run server
    npm run server

15. Tags
    ./node_modules/.bin/cucumber-js features --tags '@mytag'
    ./node_modules/.bin/cucumber-js features --tags '@mytag2'
    ./node_modules/@cucumber/cucumber/bin/cucumber-js features --tags '@mytag'

16. Reports
    ./node_modules/.bin/cucumber-js features --format progress-bar --format json:./reports/cucumber-report.json --format html:./reports/cucumber-report.html

node ./node_modules/@cucumber/cucumber/bin/cucumber-js features --tags '@mytag3'