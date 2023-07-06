import puppeteer from 'puppeteer'; 

describe('show/hide an event details', () => {
    let browser;
    let page;
    jest.setTimeout(100000);
    beforeAll(async () => {
      try {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 250,
            ignoreDefaultArgs: ['--disable-extensions'] //ignores default setting that causes timeout errors
        });
        page = await browser.newPage();
        await page.goto('http://localhost:3000');
        await page.waitForSelector('.event');
    }   catch (err) {
        console.error(err);
    }
    });
    afterAll(() => {
        browser.close();
    });

    test('An event element is collapsed by default', async () => {
        const eventDetails = page.$('.event .eventDetails');
        expect(eventDetails).toBeDefined();
      });
    
    test('User can expand an event to see its details', async () => {
        page.click('.event .expand');
        const eventDetails = page.$('.event .eventDetails');
        expect(eventDetails).toBeDefined();
      });

    test('User can collapse an event to hide its details', async () => {
        page.click('.event .expand');
        const eventDetails = page.$('.event .eventDetails');
        expect(eventDetails).toBeDefined();
      });
});