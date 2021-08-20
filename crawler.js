const puppeteer = require('puppeteer');
const fs = require('fs');

const scraperObject = {

    url: 'https://webscraper.io/test-sites/e-commerce/allinone/computers/laptops',
    async scraper(browser) {
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        await page.goto(this.url);
        let scrapedData = [];
        async function scrapeCurrentPage() {

            // grabbing notebook-specific urls
            let urls = await page.$$eval("div.thumbnail > div.caption", urlList => {
                urlList = urlList.map(el => el.querySelector('h4 > a').href);
                return urlList;
            });

            // looping through urls
            let notePromise = (url) => new Promise(async (resolve, reject) => {
                let notebook = {};
                let newPage = await browser.newPage();
                await newPage.goto(url, { waitUnil: 'networkidle0' });

                notebook['model'] = await newPage.$$('body > div.wrapper > div.container.test-site > div > div.col-md-9 > div > div > div.col-lg-10 > div.caption > h4')[0].innerText;
                notebook['price'] = await newPage.$$('body > div.wrapper > div.container.test-site > div > div.col-md-9 > div > div > div.col-lg-10 > div.caption > h4')[1].innerText;
                notebook['description'] = await newPage.$$('body > div.wrapper > div.container.test-site > div > div.col-md-9 > div > div > div.col-lg-10 > div.caption > p')[0].innerText;

                console.log(JSON.stringify(notebook));

                resolve(notebook);
                await newPage.close();
            });


            for (url in urls) {
                let currentNotebook = await notePromise(urls[url]);
                scrapedData.push(currentNotebook);
                console.log(currentPageData);
            }

            return scrapedData;

        }

        let data = await scrapeCurrentPage();
        console.log(data);
        return data;
    }
}

module.exports = scraperObject;