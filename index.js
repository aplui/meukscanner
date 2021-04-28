require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const TOKEN = process.env.TOKEN;
const puppeteer = require('puppeteer');

(async () => {

let meukUrl = 'https://tweakers.net/toetsenborden/aanbod/';

let browser = await puppeteer.launch();
let page = await browser.newPage()

await page.goto(meukUrl, { waitUntil: 'domcontentloaded' })

    let data = await page.evaluate(() => {
    let list =  document.querySelector('tr').innerText
    return list

})

console.log(data);
await browser.close();

})()

client.on('ready', () => {

    console.log(`Logged in as ${client.user.tag}!`);

});

client.login(TOKEN);

//timer die om de paar minuten checkt of er wat nieuws is