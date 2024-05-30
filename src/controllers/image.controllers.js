const catchError = require('../utils/catchError');
const Image = require('../models/Image');
const { uploadToCloudinary } = require('../utils/cloudinary');

const getAll = catchError(async(req, res) => {
    const images = await Image.findAll();
    return res.json(images);
});

const create = catchError(async(req, res) => {
    if (!req.file) return res.status(400).json({ message: "Debes enviar la imagen" });
    const { url } = await uploadToCloudinary(req.file);
    const { newsId } = req.body;
    const image = await Image.create({
        url,
        newsId,
    });
    return res.status(201).json(image);
});

module.exports = {
    getAll,
    create,
}