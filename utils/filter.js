import fs from 'fs';

export default (file) => {
    return new Promise((pResolve, pReject) => {
        console.log("Started Filtering")
        fs.readFile(file, (err, data) => {
            let dataArray = JSON.parse(data)
            let uniqueLinks = [];
            let confirmedLinks = [];
            dataArray.forEach(link => {
                let newLink = link.link.replace('http:', 'https:')
                link.link = newLink
            })
            dataArray.map((item, i) => {
                if (confirmedLinks.includes(item.link)) {
                    return;
                }
                confirmedLinks.push(item.link)
                uniqueLinks.push(item)
            })
            fs.writeFile(file, JSON.stringify(uniqueLinks, null, 2), function (err) {
                console.log("Finished Filtering")
                pResolve();
            })
        })
    })
}