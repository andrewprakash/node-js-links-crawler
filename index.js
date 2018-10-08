import express from 'express';
import crawler from './utils/crawler';
import folders from './utils/setupFolders';
import filter from './utils/filter';
import fs from 'fs'
let app = express();
const PORT = process.env.PORT;



app.get('/start', (req, res) => {
    let url = 'https://www.bnz.co.nz';
    let site = 'https://www.bnz.co.nz';
    let depth = 4;
    let ignoreList = [
        '/#content',
        'https://m.bnz.co.nz',
        'http://status.bnz.co.nz'
    ]
    folders(url)
        .then(config => {
            config.site = site;
            crawler(url, depth, config, ignoreList)
            res.sendStatus(200)
        })

})




app.listen(PORT, () => {
    console.log(`Started Crawling Service on PORT: ${PORT}`);
});