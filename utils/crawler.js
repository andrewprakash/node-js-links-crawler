import fs from 'fs';
import pageLinks from './pageLinks';
import filter from './filter'

export default (url = 'http://www.bnz.co.nz', depth = 1, config, ignoreList) => {

    console.log("Starting Crawl on", url);

    let completedDepth = 0;
    const startCrawl = () => {
        if (completedDepth == depth) {
            console.log("Crawling Completed");
            return;
        }
        process.setMaxListeners(0)
        new Promise((resolve, reject) => {
            fs.readFile(config.linksFile, (err, data) => {
                let bufferedData = JSON.parse(data);
                pageLinks(config.site, bufferedData, resolve, ignoreList);
            })
        }).then(r => {
            fs.writeFile(config.linksFile, JSON.stringify(r, null, 2), (error) => {
                filter(config.linksFile)
                    .then(r => {
                        completedDepth++
                        startCrawl()
                    })
            })

        })

    }
    startCrawl();
}