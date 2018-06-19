const puppeteer = require('puppeteer');
jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;

describe('map-tools/ExtentRouter', function () {
    let browser;
    let page;
    const testPage = 'http://localhost:8000/tests/ExtentRouterTests.html';

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: !process.env.DEBUG,
            slowMo: 200
        });
        page = await browser.newPage();
    });

    afterAll(async () => {
        if (!process.env.DEBUG) {
            await browser.close();
        }
    });

    const waitForMapLoad = () => {
        return page.waitForSelector('body.loaded');
    };

    it('sets the initial map extent - zoom', async () => {
        const x = -12447906;
        const y = 4976212;
        const zoom = 14;
        await page.goto(`${testPage}#x=${x}&y=${y}&zoom=${zoom}`);
        await waitForMapLoad();

        const props = await page.evaluate(() => window.getMapViewProps());

        expect(props.zoom).toBe(zoom);
        expect(props.center.x).toBeCloseTo(x, 0);
        expect(props.center.y).toBeCloseTo(y, 0);
    });

    it('sets the initial map extent - scale', async () => {
        const x = -12447906;
        const y = 4976212;
        const scale = 36111;
        await page.goto(`${testPage}#x=${x}&y=${y}&scale=${scale}`);
        await waitForMapLoad();

        const props = await page.evaluate(() => window.getMapViewProps());

        expect(props.scale).toBeCloseTo(scale, -1);
        expect(props.center.x).toBeCloseTo(x, 0);
        expect(props.center.y).toBeCloseTo(y, 0);
    });

    it('updates the URL hash on map extent change', async () => {
        const target = {
            x: -12512327,
            y: 4798937,
            spatialReference: { wkid: 3857 }
        };
        const zoom = 15;

        await page.goto(testPage);

        await waitForMapLoad();

        await page.evaluate((param1, param2) => window.zoomTo(param1, param2), target, zoom);

        await page.waitFor(200);

        const url = page.url();

        expect(url).toMatch(new RegExp(`zoom=${zoom}`));
        expect(url).toMatch(new RegExp(`x=${target.x}`));
        expect(url).toMatch(new RegExp(`y=${target.y}`));
    });

    it('preserves other url parameters', async () => {
        const target = {
            x: -12512327,
            y: 4798937,
            spatialReference: { wkid: 3857 }
        };
        const zoom = 15;

        await page.goto(`${testPage}?test=1`);

        await waitForMapLoad();

        await page.evaluate((param1, param2) => window.zoomTo(param1, param2), target, zoom);

        await page.waitFor(200);

        const url = page.url();

        expect(url).toMatch(/test=1/);
    });
});
