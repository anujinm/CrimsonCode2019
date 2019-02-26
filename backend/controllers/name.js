const db = require('../models');
const PeopleName = db.PeopleName;
const sequelize = db.sequelize;

module.exports.getRandomNames = async (req, res, next) => {
    try {

        const names = (await sequelize.query(`SELECT id, name FROM PeopleNames ORDER BY RAND() LIMIT 15;`))[0];

        if (names) {
            return res.status(200).json(names);
        } else {
            return res.status(200).json([]);
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: 'Server error'});
    }
};


module.exports.getRandomFullNames = async (req, res, next) => {
    try {

        const names = (await sequelize.query(`SELECT * FROM PeopleNames ORDER BY RAND() LIMIT 15;`))[0];

        for (let i = 0; i < names.length; i++) {
            names[i]['jsonData'] = JSON.parse(names[i]['jsonData']);
        }


        if (names) {
            return res.status(200).json(names);
        } else {
            return res.status(200).json([]);
        }
    } catch (e) {
        return res.status(500).json({message: 'Server error'});
    }
};
