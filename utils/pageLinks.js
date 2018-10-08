import request from 'request';
import Cheerio from 'cheerio'

export default (site, links, promiseResolver, ignoreList = []) => {
    let newSetLinks = [];
    let linksLength = links.length;
    let linksTestedLength = 0;
    const getLinksFromPage = () => {
        if (linksLength == linksTestedLength) {
            let updateLinks = links.concat(newSetLinks);
            promiseResolver(updateLinks);
            return false;
        }
        let link = links[linksTestedLength];
        console.log("Testing Link ---> ", link)
        request(link.link, function (err, res, body) {
            try {

                const $ = Cheerio.load(body);
                $('a').each(function (i, link) {
                    let theLink = $(link).attr('href')
                    let siteLink = {}
                    if (typeof theLink != 'undefined') {

                        if (!ignoreList.includes(theLink)) {
                            if (theLink.includes('http') || theLink.includes('tel:')) {
                                siteLink.link = theLink;
                            } else {
                                siteLink.link = `${site}` + theLink;
                            }
                            if (!theLink.includes('tel')) {
                                newSetLinks.push(siteLink);
                            }
                        }
                    }
                })
            } catch (e) {
                console.log("there was error", e)
            }
            linksTestedLength++;
            setTimeout(getLinksFromPage, 200)
            // getLinksFromPage();
        })
    }
    getLinksFromPage();
}