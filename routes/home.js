const express = require('express')
const router = express.Router();
const { check, validationResult } = require('express-validator');

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

// Search
router.get('/search', homeController.property_list)

// Get Property By Id
router.get('/property/:id', homeController.get_property)

// compare
router.get('/compare', homeController.compare)

// compare
router.get('/property_list', homeController.property_list)

// Subscribe
router.post('/subscribe',[
    check('email').not().isEmpty().withMessage('email field is required'),
    check('email').isEmail().withMessage('please enter a valid email'),
  ],homeController.subscribe)

// Subscribe
// router.post('/property/subscribe',[
//   check('email').not().isEmpty().withMessage('email field is required'),
//   check('email').isEmail().withMessage('please enter a valid email'),
// ],homeController.subscribe)

// Contact
router.post('/contact_form', homeController.contact_form)

// Contact
// router.post('/property/contact_form', homeController.contact_form)

module.exports = router