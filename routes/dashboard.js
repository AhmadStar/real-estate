const express = require('express')
const router = express.Router();
const { check, validationResult } = require('express-validator');
const {ensureAuthenticated} = require('../config/auth');

const dashboardController = require('../controllers/dashboard-controllers');

// Login router
router.get('/login', dashboardController.login_get)

// Register router
router.get('/register', dashboardController.register_get)

// Register handle
router.post('/register', dashboardController.register)

// Login handle
router.post('/login', dashboardController.login)

// Dashboard
router.get('/', dashboardController.dashboard)

// Property List
router.get('/property_list', dashboardController.property_list)

// Logout handle
router.get('/logout', dashboardController.logout)

// Add Property
router.get('/add_property', dashboardController.add_property)

// Add Agent 
router.get('/add_agent', dashboardController.add_agent)

// Add Agent 
router.get('/add_partner', dashboardController.add_partner)

// Save Agent 
router.post('/save_agent', dashboardController.save_agent)

// Save Partner 
router.post('/save_partner', dashboardController.save_partner)

// Settings handle
router.get('/settings', dashboardController.settings)

// Settings handle
router.post('/update_settings', dashboardController.update_settings)

// Agent handle
router.get('/agent_list', dashboardController.agent_list)

// Agent handle
router.get('/partner_list', dashboardController.partner_list)

// Add Property
router.post('/save_property',[
    check('space')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 6 })
  ],
   dashboardController.save_property
);

module.exports = router
