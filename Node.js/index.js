const puppeteer = require('puppeteer')
const ObjectsToCsv = require('objects-to-csv')

try {

    (async () => {
        
        // CODE DU SCRAPING

        // ETAPE 1 : FETCHING
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 800 });
        await page.goto('https://www.lemonde.fr/');

        //ETAPE 2 : PARSING
        var r = [];
        const results = await page.$$('div.article > a');
        for(const result of results){
            let url = await page.evaluate(el => el.getAttribute('href'), result);
            let titre = await page.evaluate(el => el.querySelector('.article__title').innerText.trim(), result);
            r.push([titre,url]);
        }
        console.log(r);

        //ETAPE 3 : STOCKAGE
        const csv = new ObjectsToCsv(r)
        await csv.toDisk('resultat.csv', { append: true })
    

    })()

} catch (err) {

    // LOG DES EXCEPTIONS DANS LA CONSOLE

    console.error(err)

  }