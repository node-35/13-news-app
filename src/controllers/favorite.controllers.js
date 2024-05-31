const catchError = require('../utils/catchError');
const Favorite = require('../models/Favorite');
const User = require('../models/User');

const getAll = catchError(async(req, res) => {
    const { userId, newsId, offset, perPage } = req.query;
    const where = {};
    if (userId) where.userId = userId;
    if (newsId) where.newsId = newsId;
    const results = await Favorite.findAll({ 
        include: [User],
        where: where,
        offset: offset,
        limit: perPage,
    });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const { newsId, rate } = req.body;
    const result = await Favorite.create({
        newsId,
        rate,
        userId: req.user.id,
    });
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Favorite.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Favorite.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Favorite.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}