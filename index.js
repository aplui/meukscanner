require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const TOKEN = process.env.TOKEN;
const puppeteer = require('puppeteer');

async function ad() {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    const tweakersUrl = 'https://tweakers.net/toetsenborden/aanbod/'
    const accept = 'button[class="ctaButton"]'

        await page.goto(tweakersUrl, { waitUntil: 'networkidle0'  });
        await page.setDefaultNavigationTimeout(0);
        await page.waitForSelector(accept);
        await page.click(accept);
        await page.waitForNavigation({waitUntil: 'networkidle0'});

            let data = await page.evaluate(() => {

                let title = document.querySelector('#listing > table > tbody > tr:nth-child(1) > td:nth-child(2) > p.title.ellipsis > a').innerText;
                let img = document.querySelector('#listing > table > tbody > tr:nth-child(1) td > a > img').src;
                let text = document.querySelector('p[class="lead"]').innerText
                let price = document.querySelector('#listing > table > tbody > tr:nth-child(1) > td.vaprice > p > a').innerText;
                let url = document.querySelector('#listing > table > tbody > tr:nth-child(1) > td:nth-child(2) > p.title.ellipsis > a').href
        
        return {

            title,
            img,
            text,
            price,
            url
        }
   
    });

    //console.log(data);
    await browser.close();
    return data
  };


  client.on('message', async msg => {

    if (msg.content === '!meuk') {
        
        let a = (await ad())
        const embed = new Discord.MessageEmbed()

            .setTitle(a.title)
            .setDescription(a.text)
            .setURL(a.url)
            
        msg.reply(embed)
}

})


client.login(TOKEN);

client.on('ready', () => {

    console.log(`Logged in as ${client.user.tag}!`);

});

//timer die om de paar minuten checkt of er wat nieuws is
// als er iets is gewijzigd tov voorgaande situatie (if else) update doen in discord
//toevoegen pending scan