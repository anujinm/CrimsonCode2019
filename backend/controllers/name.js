const db = require('../models');
const PeopleName = db.PeopleName;


module.exports.getRandomNames = async (req, res, next) => {
    try {
        const names = await PeopleName.findAll({});
        if (names) {
            return res.status(200).json();
        } else {
            return res.status(200).json([]);
        }
    } catch (e) {
        return res.status(500).json({message: 'Server error'});
    }
};
