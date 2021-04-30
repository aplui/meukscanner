require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const TOKEN = process.env.TOKEN;
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    const url = 'https://tweakers.net/toetsenborden/aanbod/'
    const accept = 'button[class="ctaButton"]'

        await page.goto(url, { waitUntil: 'networkidle0'  });
        await page.waitForSelector(accept);
        await page.click(accept);
        await page.waitForNavigation({waitUntil: 'networkidle0'});

            let data = await page.evaluate(() => {
            let ad = document.querySelector('#listing > table > tbody > tr:nth-child(1) > td:nth-child(2)').innerText;
        
        return ad
   
    });

    console.log(data);
    await browser.close();
  })();

client.on('ready', () => {

    console.log(`Logged in as ${client.user.tag}!`);

});

client.login(TOKEN);

//timer die om de paar minuten checkt of er wat nieuws is