const express = require('express')
const router = express.Router();
const { check, validationResult } = require('express-validator');
const {ensureAuthenticated} = require('../config/auth');

const dashboardController = require('../controllers/dashboard-controllers');

let multer = require('multer');

// File upload folder
const DIR = './public/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)
  }
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      console.log('sdasd ad a')
      // return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});


// Dashboard
router.get('/', dashboardController.dashboard)
// Login router
router.get('/login', dashboardController.login_get)
// Login handle
router.post('/login', dashboardController.login)
// Register router
router.get('/register', dashboardController.register_get)
// Register handle
router.post('/register', dashboardController.register)
// Logout handle
router.get('/logout', dashboardController.logout)



// Property List
router.get('/property_list', dashboardController.property_list)
// Add Property
router.get('/add_property', dashboardController.add_property)
// Add Property
router.post('/save_property', upload.any(), [
  check('space').not().isEmpty().withMessage('field is required'),
  check('rooms').not().isEmpty().withMessage('field is required'),
  check('bath').not().isEmpty().withMessage('field is required'),
  check('garage').not().isEmpty().withMessage('field is required'),
  check('price').not().isEmpty().withMessage('field is required'),
],
 dashboardController.save_property
);

router.post('/update_partner', upload.single('partner_image'), dashboardController.update_partner)

// Agent List
router.get('/agent_list', dashboardController.agent_list)
// Add Agent 
router.get('/add_agent', dashboardController.add_agent)
// Save Agent 
router.post('/save_agent', upload.single('image') ,[
    check('name').not().isEmpty().withMessage('field is required'),
    check('role').not().isEmpty().withMessage('field is required'),
  ], 
  dashboardController.save_agent
)



// Partner List
router.get('/partner_list', dashboardController.partner_list)
// Add Partner
router.get('/add_partner', dashboardController.add_partner)
// Save Partner 
router.post('/save_partner', upload.single('image') ,[
    check('name').not().isEmpty().withMessage('field is required'),
    // check('image').not().isEmpty().withMessage('field is required'),
  ],
  dashboardController.save_partner
)


// Settings Handler 
router.get('/settings', dashboardController.settings)
// Settings handle
router.post('/update_settings', dashboardController.update_settings)


module.exports = router