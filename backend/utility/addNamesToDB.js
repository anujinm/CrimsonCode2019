const db = require('../models');
const PeopleName = db.PeopleName;
const fs = require('fs');


async function addRow(name, gender, birthCount, birthYear) {
    try {

        await PeopleName.create({name, gender, birthYear, birthCount});

    } catch (e) {
        console.log(e);
    }
}


async function readNames() {
    try {
        const uniqueNames = new Map();

        const files = fs.readdirSync('./names');

        for (let i = 0; i < files.length; i++) {
            const year = files[i].substring(3, 7);
            const names = fs.readFileSync('./names/' + files[i], 'utf8').trim().split('\n').map(row => row.split(',').map(x => x.trim()));

            for (let i = 0; i < names.length; i++) {
                names[i].push(year);
                uniqueNames.set(names[i][0], names[i]);
            }
        }

        return uniqueNames

    } catch(e) {
        console.log(e);
    }
}


(async() => {
    const res = await readNames();

    for (let [key, value] of res) {
        await addRow(value[0], value[1], parseInt(value[2]), parseInt(value[3]));
    }
})();
