const { setWorldConstructor } = require('@cucumber/cucumber')
const { Builder } = require('selenium-webdriver');
const chrome = require("selenium-webdriver/chrome");

const screen = {
    width: 1920,
    height: 1080
};

class BddWorld {
    constructor() {
        this.chromeDriver = null
    }

    async openChrome(url) {
        if (!this.chromeDriver) {
            this.chromeDriver = new Builder().forBrowser('chrome');

            let chromeOptions = new chrome.Options();


            chromeOptions.addArguments("test-type");
            chromeOptions.addArguments("start-maximized");

            chromeOptions.addArguments("--js-flags=--expose-gc");
            chromeOptions.addArguments("--enable-precise-memory-info");
            chromeOptions.addArguments("--disable-popup-blocking");
            chromeOptions.addArguments("--disable-default-apps");
            chromeOptions.addArguments("--disable-infobars");
            chromeOptions.addArguments("--ignore-certificate-errors");

            this.chromeDriver.setChromeOptions(chromeOptions);
            this.chromeDriver = await this.chromeDriver.build();
        }

        await this.chromeDriver.get(url)
    }

    async closeChrome() {
        if (this.chromeDriver) {
            await this.chromeDriver.quit()
        }
    }
}

setWorldConstructor(BddWorld)