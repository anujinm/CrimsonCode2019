const db = require('../models');
const Like = db.Like;
const PeopleName = db.PeopleName;

module.exports.assignLike = async (req, res, next) => {
    try {
        const assignment = {
            UserId: req.body.UserId,
            PeopleNameId: req.body.PeopleNameId
        };
        await Like.create(assignment);
        return res.status(201).json({message: 'Like Assigned Successfully'});
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: 'Server error'});
    }
};


module.exports.getLikes = async (req, res, next) => {
    try {
        const likes = await Like.findAll({
            where: {UserId: req.user.userId},
            attributes: [],
            include: [{
                model: PeopleName,
            }]
        });
        if (likes) {
            const editedLikes = likes.map(b => b.PeopleName);
            for (let i = 0; i < likes.length; i++) {
                editedLikes[i]['jsonData'] = JSON.parse(editedLikes[i]['jsonData']);
            }

            return res.status(200).json(editedLikes);
        } else {
            return res.status(200).json([]);
        }

    } catch (e) {
        return res.status(500).json({message: 'Server error'});
    }
};
