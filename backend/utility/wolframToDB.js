const fs = require('fs');
const db = require('../models');
const PeopleName = db.PeopleName;


async function readWolframData() {
    try {

        const files = fs.readdirSync('./results').filter(x => x.endsWith('.txt'));


        for (let i = 0; i < files.length; i++) {
            const name = files[i].split('.')[0];
            console.log(name);
            const obj = fs.readFileSync('./results/' + files[i], 'utf8');
            await PeopleName.create({name, jsonData: obj});
        }



    } catch (e) {
        console.log(e);
    }
}






(async() => {
    await readWolframData()
})();





