const express = require('express')
const router = express.Router();

const homeController = require('../controllers/home-controllers ');

// Home Page
router.get('/', homeController.home)

// About Page
router.get('/about', homeController.about)

// Contact Page
router.get('/contact', homeController.contact)

// Search
router.post('/search', function(req, res, next) {

    console.log(req.body);
    // console.log('test ahamd form ');


});

// Get Property By Id
router.get('/property/:id', homeController.get_property)

// compare
router.get('/compare', homeController.compare)

module.exports = router