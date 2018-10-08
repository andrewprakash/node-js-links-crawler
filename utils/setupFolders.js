
import fs from 'fs';

export default (url) => {
    return new Promise((resolve, reject) => {

        if (!fs.existsSync("./archive")) {
            fs.mkdirSync("./archive");
        }

        let newFolder = String(new Date());
        newFolder = newFolder.split(" ");
        let folderName = newFolder.slice(0, 4).join("-");
        let dir = "./archive/" + folderName;

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        let linksFolder = "./archive/" + folderName + "/links";
        let dataFolder =
            "./archive/" + folderName + "/data";
        if (!fs.existsSync(linksFolder)) {
            fs.mkdirSync(linksFolder);
        }
        if (!fs.existsSync(dataFolder)) {
            fs.mkdirSync(dataFolder);
        }

        let d = new Date();
        let jsonFile = `links-${d.getTime()}.json`
        let obj = {
            linksFolder: linksFolder,
            dataFolder: dataFolder,
            linksFile: linksFolder + `/${jsonFile}`,
            fileName: `links-${d.getTime()}`
        }

        let initialObj = {
            link: url
        }
        let initLinksArray = [];
        initLinksArray.push(initialObj);

        fs.writeFile(linksFolder + `/${jsonFile}`, JSON.stringify(initLinksArray, null, 2), (error) => {
            console.log("Files Created Successfully")
            resolve(obj)
        })

    })
}