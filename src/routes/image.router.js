const { getAll, create } = require('../controllers/image.controllers');
const express = require('express');
const upload = require('../utils/multer');
const verifyJWT = require('../utils/verifyJWT');

const imageRouter = express.Router();

imageRouter.route('/images')
    .get(getAll)
    .post(verifyJWT, upload.single('image'), create);

module.exports = imageRouter;
