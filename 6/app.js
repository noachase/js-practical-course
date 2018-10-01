process.env.NODE_CONFIG_DIR = __dirname + '/config/';

const express = require('express');
const ReadRss = require('./service/readRss.service.js');


const config = require('config');
const port = process.env.PORT || config.get('port');
const mongodb = config.get('mongodb');

const RBK = require('./RSS/RBK/rbk.settings');
const Korrespondent = require('./RSS/Korrespondent/Korrespondenr.settings');
const Facts = require('./RSS/Facts/facts.settings');
const Finance = require('./RSS/Finance/finance.settings');
const Tyzhden = require('./RSS/Tyzhden/tyzhden.settings');


const mongoose = require('mongoose');
mongoose.connect(mongodb.connection);


const Article = require('./model/article.model');


const app = express();
// let counter = 1;

console.log('start here');

async function myRouter(req, res) {
    // const data = req.query.p;

    const allArticles = await Article.find({});

    console.log('I get request from web browser');
    // const now = new Date();
    // get all articles from DB
    // send ones to browser
    // res.send(`${counter++}) I am working here !! now = ${now} data = ${data}`);
    res.send(allArticles);
}

app.get('/', myRouter);
app.listen(port);

setTimeout( async () =>{
    // URLS error
    const rssReaderTyzhden = new ReadRss(Tyzhden);
    await rssReaderTyzhden.dataProcess();
}, 10);

setTimeout( async () =>{
    // URLS error
    const rssReaderFinance = new ReadRss(Finance);
    await rssReaderFinance.dataProcess();
}, 100);

setTimeout( async () =>{
    // URLS error
    const rssReaderRBK = new ReadRss(RBK);
    await rssReaderRBK.dataProcess();
}, 1000);

setTimeout( async () =>{
    // init error
    // const rssReaderFacts = new ReadRss();
    const rssReaderFacts = new ReadRss(Facts);
    await rssReaderFacts.dataProcess();
}, 2000);

setTimeout( async () =>{
    // error free
    const rssReaderKorrespondent = new ReadRss(Korrespondent);
    await rssReaderKorrespondent.dataProcess();
}, 3000);



console.log('finish code here');
