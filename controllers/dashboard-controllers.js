const bcrypt = require('bcryptjs')
const passport = require('passport')
const con = require('../app')
const { validationResult } = require('express-validator');
const date = require('date-and-time');

const dashboard = async (req, res) => {
    res.render('dashboard/dashboard', { name:'req.user.name', layout: 'dashboard/dashboard_layout' })
};

const register = async (req, res) => {
  const { name, email, password, password2 } = req.body;
    let errors = [];
    if(!name || !email || !password || !password2){
        errors.push({msg:'Please fill in all the fields'});
    }
    if(password !== password2){
        errors.push({msg:'Passwords do not match'});
    }
    if(password.length < 6){
        errors.push({msg:'Passwords must be at least 6 characters long'});
    }
    if(errors.length > 0){
        res.render('dashboard/register', {
            errors,
            name,
            email,
            password,
            password2
        })
    }
    else{
        const myquery = "SELECT * FROM user WHERE email = " + "'"+email+"'"
        con.query(myquery, (err, user) => {  
            if (err) throw err;  
            if(user.length > 0){
                errors.push({msg:'Email already registered'});
                res.render('dashboard/register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                })
            }
            else{
                // Hash password
                bcrypt.genSalt(10, (err, salt) => 
                   bcrypt.hash(password, salt, (err,hash) => {
                       if(err) throw err;
                       encryptedpassword = hash;
                       const myquery = "INSERT INTO user (name, email, password) VALUES ('"+name+"', '"+email+"', '"+hash+"')";
                        con.query(myquery, function (err, result) {  
                            if (err) throw err; 
                            req.flash('success_msg', 'You are registered.') 
                            res.redirect('/dashboard/login')
                        });
                   }) 
                )
            }  
        });
    }
};

const login = async (req, res, next) => {
    passport.authenticate('local',{
        successRedirect:'/dashboard',
        failureRedirect:'/dashboard/login',
        failureFlash:true 
    })(req, res, next)
};

const login_get = (req, res) => {
    res.render('dashboard/login', { layout: 'layout' ,title:'Login'})
};

const register_get = (req, res) => {
    res.render('dashboard/register', { layout: 'layout' ,title:'Register'})
};

const logout = (req, res) => {
    req.logout();
    req.flash('success_msg','You are logged out');
    res.redirect('/')
};

const property_list = async (req, res) => {
    const myquery = "SELECT * FROM property"
    con.query(myquery, (err, result) => {  
        if (err) throw err;  
        if(result.length > 0){
            res.render('dashboard/property_list' ,{result:result, name:'req.user.name', layout: 'dashboard/dashboard_layout' })
        }
    });
};

const add_property = async (req, res) => {
    res.render('dashboard/add_property', { name:'req.user.name', layout: 'dashboard/dashboard_layout' })
};

const save_property = async (req, res) => {
    const { space, rooms, bath, garage, price, location, description, 
        small_desc, amenities, type, built_year, feature_image } = req.body;
    
    const myquery = 
    "INSERT INTO property (space, rooms, bath, garage, price, location, description, small_desc, amenities, type, built_year, feature_image, lang) VALUES ('"+space+"', '"+rooms+"', '"+bath+"', '"+garage+"', '"+price+"', '"+location+"', '"+description+"', '"+small_desc+"', '"+amenities+"', '"+type+"', '"+built_year+"', '"+feature_image+"', '"+res.locals.current_locale+"')";
    con.query(myquery, function (err, result) {  
        if (err) throw err; 
        // req.flash('success_msg', 'You are registered.') 
        // res.redirect('/dashboard/add_property')
    });
};

const partner_list = async (req, res) => {
    const myquery = "SELECT * FROM partners"
    con.query(myquery, (err, result) => {  
        if (err) throw err;  
        // if(result.length > 0){
            res.render('dashboard/partner_list' ,{partner_list:result, name:'req.user.name', layout: 'dashboard/dashboard_layout' })
        // }
    });
};

const add_partner = async (req, res) => {
    res.render('dashboard/add_partner', { name:'req.user.name', layout: 'dashboard/dashboard_layout' })
};

const save_partner = async (req, res) => {
    let errors = [];
    const validation = validationResult(req)
    if (!validation.isEmpty()) {
        
        validation.errors.forEach(element => {
            errors.push({msg: element.param+' '+element.msg});
        });

        return res.render('dashboard/add_partner', {
            errors,
            layout: 'dashboard/dashboard_layout',
            name: 'test'
        })
      }
    const { name, image } = req.body;
    
    const myquery = 
    "INSERT INTO partners (name, image) VALUES ('"+name+"', '"+image+"')";
    con.query(myquery, function (err, result) {  
        if (err) throw err; 
        // req.flash('success_msg', 'You are registered.') 
        // res.redirect('/dashboard/add_property')
    });
};

const agent_list = async (req, res) => {
    const myquery = "SELECT * FROM agents"
    con.query(myquery, (err, result) => {  
        if (err) throw err;  
        // if(result.length > 0){
            res.render('dashboard/agent_list' ,{agent_list:result, name:'req.user.name', layout: 'dashboard/dashboard_layout' })
        // }
    });
    // res.render('dashboard/agent_list' ,{agent_list:[], name:'req.user.name', layout: 'dashboard/dashboard_layout' })
};

const add_agent = async (req, res) => {
    res.render('dashboard/add_agent', { name:'req.user.name', layout: 'dashboard/dashboard_layout' })
};

const save_agent = async (req, res) => {
    let errors = [];
    const validation = validationResult(req)
    if (!validation.isEmpty()) {
        
        validation.errors.forEach(element => {
            errors.push({msg: element.param+' '+element.msg});
        });

        return res.render('dashboard/add_agent', {
            errors,
            layout: 'dashboard/dashboard_layout',
            name: 'test'
        })
      }
    const { name, facebook, twitter, instagram, role, phone, image, brief } = req.body;
    
    const myquery = 
    "INSERT INTO agents (name, facebook, twitter, instagram, role, phone, image, brief) VALUES ('"+name+"', '"+facebook+"', '"+twitter+"', '"+instagram+"', '"+role+"', '"+phone+"', '"+image+"', '"+brief+"')";
    con.query(myquery, function (err, result) {  
        if (err) throw err; 
        // req.flash('success_msg', 'You are registered.') 
        // res.redirect('/dashboard/add_property')
    });
};

const settings = async (req, res) => {
    const en_settings = [];
    const ch_settings = [];
    const myquery = "SELECT id, name, value, lang from site_settings"
    con.query(myquery, (err, settings) => {  
        if (err) throw err;  
        if(settings.length > 0){
            settings.forEach(element => {
                if(element.lang == 'en')
                    en_settings[element.id] = element;
                else
                    ch_settings[element.id] = element;
            });
            res.render('dashboard/settings' ,{en_settings:en_settings, ch_settings:ch_settings, name:'req.user.name', layout: 'dashboard/dashboard_layout' })
        }
    });
};

const update_settings = async (req, res) => {
    for (var key in req.body){
        const myquery = "update site_settings set value = '"+req.body[key]+"' where id = '"+key+"' "
        con.query(myquery, (err, result) => {  
            if (err) throw err;
            console.log(result)
        });
    }
};

exports.dashboard = dashboard;

// Auth 
exports.register = register;
exports.login_get = login_get;
exports.register_get = register_get;
exports.logout = logout;
exports.login = login;

// Properties CRUD
exports.property_list = property_list;
exports.add_property = add_property;
exports.save_property = save_property;

// Partners CRUD
exports.partner_list = partner_list;
exports.add_partner = add_partner;
exports.save_partner = save_partner;

// Agents CRUD
exports.agent_list = agent_list;
exports.add_agent = add_agent;
exports.save_agent = save_agent;

// Settings
exports.settings = settings;
exports.update_settings = update_settings;