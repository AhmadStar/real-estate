const express = require('express')
const router = express.Router();

const homeController = require('../controllers/home-controllers ');

// Home Page
router.get('/', homeController.home)

// About Page
router.get('/about', homeController.about)

// Contact Page
router.get('/contact', homeController.contact)

// Contact Page
router.get('/news', homeController.news)

// Search
router.post('/search', homeController.search)

// Get Property By Id
router.get('/property/:id', homeController.get_property)

// compare
router.get('/compare', homeController.compare)

// compare
router.get('/property_list', homeController.property_list)

module.exports = router