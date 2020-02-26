const express = require('express');
const Movie = require('../models/Movie.js');
const uploadCloud = require('../config/cloudinary');
const router = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

// Lists all movies
router.get('/', (req, res, next) => {
  Movie.find()
  .then((movies) => {
    res.render('index', { movies });
  })
  .catch((error) => {
    console.log(error);
  })
});

// Shows the form to add a movie's picture
router.get('/movie/add', (req, res, next) => {
  res.render('movie-add');
});

// Creates the new movie and stores its picture in Cloudinary
router.post('/movie/add', uploadCloud.single('photo'), (req, res, next) => {
  const { title, description } = req.body;
  const imgPath = req.file.url;
  const imgName = req.file.originalname;
  Movie.create({title, description, imgPath, imgName})
  .then(movie => {
    res.redirect('/');
  })
  .catch(error => {
    console.log(error);
  })
});

module.exports = router;
