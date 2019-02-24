const db = require('../models');
const Post = db.Post;
const User = db.User;
const Like = db.Like;
const Comment = db.Comment;

module.exports.newPost = async (req, res, next) => {
    try {
        const image = req.file;
        if (!image) {
            return res.status(422).json({message: 'Image not a valid'});
        }
        const post = {
            title: req.body.title,
            subTitle: req.body.subTitle,
            content: req.body.content,
            picUrl: image.path,
            type: 'blog',
            category: req.body.category,
            UserId: req.user.userId
        };
        await Post.create(post);
        return res.status(200).json({message: 'Post Created'});
    } catch (e) {
        return res.status(500).json({message: 'Server error'});
    }
};

module.exports.newArticle = async (req, res, next) => {
    try {
        const image = req.file;
        if (!image) {
            return res.status(422).json({message: 'Image not a valid'});
        }
        const post = {
            title: req.body.title,
            subTitle: req.body.subTitle,
            content: req.body.content,
            picUrl: image.path,
            type: req.body.type,
            category: req.body.category,
            UserId: req.user.userId
        };
        await Post.create(post);
        return res.status(200).json({message: 'Article Created'});
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: 'Server error'});
    }
};

module.exports.getRecentArticles = async (req, res, next) => {
    try {
        const q = {
            pageSize: 10,
            pageNumber: 0,
        };

        if (req.query.pageSize) {
            q.pageSize = +req.query.pageSize;
        }

        if (req.query.pageNumber) {
            q.pageNumber = +req.query.pageNumber;
        }

        const articles = await getPosts(q.pageSize, q.pageNumber * q.pageSize, 'article');

        return res.status(201).json(articles);
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: 'Server error'});
    }
};

module.exports.getRecentPosts = async (req, res, next) => {
    try {
        const q = {
            pageSize: 10,
            pageNumber: 0,
        };

        if (req.query.pageSize) {
            q.pageSize = +query.pageSize;
        }

        if (req.query.pageNumber) {
            q.currentPage = +query.pageNumber;
        }

        const blogs = await getPosts(q.pageSize, q.pageNumber * q.pageSize, 'blog');

        return res.status(201).json(blogs);
    } catch (e) {
        return res.status(500).json({message: 'Server error'});
    }
};

module.exports.getPost = async (req, res, next) => {
    try {
        const id = req.params.id;
        const post = await Post.findOne({
            where: {id},
            include: [{
                model: User,
                attributes: ['id', 'firstName', 'lastName', 'bio', 'profilePic']
            }, {
                model: Comment,
                include: [{
                    model: User,
                    attributes: ['id', 'firstName', 'lastName', 'profilePic']
                }]
            }, {
                model: Like,
                include: [{
                    model: User,
                    attributes: ['id', 'firstName', 'lastName', 'profilePic']
                }]
            }]
        });
        if (post) {
            return res.status(200).json(post);
        }
        return res.status(404).json({message: 'Post not found'});
    } catch (e) {
        return res.status(500).json({message: 'Server error'});
    }
};


async function getPosts(limit, offset, type) {
    try {
        return await Post.findAll({
            limit,
            offset,
            where: {type},
            order: [['CreatedAt', 'DESC']]
        });
    } catch (e) {
        return [];
    }
}
