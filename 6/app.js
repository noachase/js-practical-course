const express = require('express');
const ReadRss = require('./readRss.class.js');

const RBK = require('./RSS/RBK/rbk.settings');
const Korrespondent = require('./RSS/Korrespondent/Korrespondenr.settings');
const Facts = require('./RSS/Facts/facts.settings');


const app = express();
let counter = 1;

console.log('start here');

function myRouter(req, res) {
    const data = req.query.p;
    console.log('I get request from web browser');
    const now = new Date();
    res.send(`${counter++}) I am working here !! now = ${now} data = ${data}`);
}

app.get('/', myRouter);
app.listen(3000);


setTimeout( async () =>{
    // URLS error
    const rssReaderRBK = new ReadRss(RBK);
    await rssReaderRBK.getData();
}, 1000);

setTimeout( async () =>{
    // init error
    // const rssReaderFacts = new ReadRss();
    const rssReaderFacts = new ReadRss(Facts);
    await rssReaderFacts.getData();
}, 10000);

setTimeout( async () =>{
    // error free
    const rssReaderKorrespondent = new ReadRss(Korrespondent);
    await rssReaderKorrespondent.getData();
}, 5000);



console.log('finish code here');
