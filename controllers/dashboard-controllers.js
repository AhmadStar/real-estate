const bcrypt = require('bcryptjs')
const passport = require('passport')
const con = require('../app')
const { validationResult } = require('express-validator');
const helpers = require('../config/helper');
const e = require('express');

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
    let errors = [];
    const validation = validationResult(req)
    if (!validation.isEmpty()) {
        
        validation.errors.forEach(element => {
            errors.push({msg: element.param+' '+element.msg});
        });

        return res.render('dashboard/add_property', {
            errors,
            layout: 'dashboard/dashboard_layout',
            name: 'test'
        })
      }
    if(req.files.length == 0){
        errors.push({msg: 'Please Upload at least one file'});

        return res.render('dashboard/add_property', {
            errors,
            layout: 'dashboard/dashboard_layout',
            name: 'test'
        })
    }

    const { space, rooms, bath, garage, price, location, description, 
        small_desc, amenities, type, built_year } = req.body;
    
    const myquery = 
    "INSERT INTO property (space, rooms, bath, garage, price, location, description, small_desc, amenities, type, built_year, feature_image, lang) VALUES ('"+space+"', '"+rooms+"', '"+bath+"', '"+garage+"', '"+price+"', '"+location+"', '"+description+"', '"+small_desc+"', '"+amenities+"', '"+type+"', '"+built_year+"', '"+req.files[0].filename+"', '"+res.locals.current_locale+"')";
    con.query(myquery, function (err, result) {  
        if (err) throw err;
        console.log(result.insertId)
        if(req.files.length > 1){
            req.files.shift();
            req.files.forEach(element => { 
                const myquery = "INSERT INTO images (name , property_id) VALUES ('"+element.filename+"', '"+result.insertId+"')";
                con.query(myquery, (err, result) => {  
                    if (err) throw err;
                });
              }); 
            req.flash('success_msg', 'Property saved Successfully.') 
            res.redirect('/dashboard/add_property')
        }
    });
};

const update_property = async (req, res) => {
    let errors = [];
    const validation = validationResult(req)
    if (!validation.isEmpty()) {
        
        validation.errors.forEach(element => {
            errors.push({msg: element.param+' '+element.msg});
        });
        return res.json({ value: false, errors : errors });
      }

    const { property_id, space , rooms, bath, garage, price, location, description, small_desc, type, amenities, built_year, furniture_type } = req.body;

    files = [];
    feature_image = '';
    req.files.forEach(element => {
        if(element.fieldname != 'feature_image')
            files.push(element.filename);
        else 
         feature_image = element.filename
    });

    files.forEach(element => {
        const myquery = "INSERT INTO images (name , property_id) VALUES ('"+element+"', '"+property_id+"')";
        con.query(myquery, (err, result) => {  
            if (err) throw err;
        });
    });

    if(!feature_image){
        const myquery = 
        "update property set space ='"+space+"',rooms ='"+rooms+"' ,bath ='"+bath+"' ,garage ='"+garage+"' , price ='"+price+"' , location ='"+location+"' , description='"+description+"' , small_desc='"+small_desc+"' , type='"+type+"' , amenities='"+amenities+"', built_year='"+built_year+"', furniture_type='"+furniture_type+"' where id = "+ property_id;

        con.query(myquery, function (err, result) {  
            if (err) throw err;
            res.json({ value: true, result : result });
        });
    }else{
        const myquery = 
        "update property set feature_image ='"+feature_image+"', space ='"+space+"', rooms ='"+rooms+"' ,bath ='"+bath+"' ,garage ='"+garage+"' , price ='"+price+"' , location ='"+location+"' , description='"+description+"' , small_desc='"+small_desc+"' , type='"+type+"' , amenities='"+amenities+"', built_year='"+built_year+"', furniture_type='"+furniture_type+"' where id = "+ property_id;

        con.query(myquery, function (err, result) {  
            if (err) throw err;
            res.json({ value: true, result : result });
        });
    }
};

const delete_property = async (req, res) => {
    const { property_id } = req.body;

    const myquery = 
    "delete from property where id = "+ property_id;

    console.log(myquery)

    con.query(myquery, function (err, result) {  
        if (err) throw err;
        res.json({ result : result });
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
    const { name } = req.body;
    
    const myquery = 
    "INSERT INTO partners (name, image) VALUES ('"+name+"', '"+req.file.originalname+"')";
    con.query(myquery, function (err, result) {  
        if (err) throw err; 
        req.flash('success_msg', 'Partner Added Successfully.') 
        res.redirect('/dashboard/add_partner')
    });

};

const update_partner = async (req, res) => {
    const { partner_id, partner_name } = req.body;
    
    if(req.file){
        const myquery = 
        "update partners set name ='"+partner_name+"', image='"+req.file.filename+"' where id = "+ partner_id;
        con.query(myquery, function (err, result) {  
            if (err) throw err;
            res.json({ result : result });
        });
    }else{
        const myquery = 
        "update partners set name ='"+partner_name+"' where id = "+ partner_id;
        con.query(myquery, function (err, result) {  
            if (err) throw err;
            res.json({ result : result });
        });
    }
};

const delete_partner = async (req, res) => {
    const { partner_id } = req.body;

    const myquery = 
    "delete from partners where id = "+ partner_id;

    console.log(myquery)

    con.query(myquery, function (err, result) {  
        if (err) throw err;
        res.json({ result : result });
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
    const { name, facebook, twitter, instagram, role, phone, brief } = req.body;
    
    const myquery = 
    "INSERT INTO agents (name, facebook, twitter, instagram, role, phone, image, brief) VALUES ('"+name+"', '"+facebook+"', '"+twitter+"', '"+instagram+"', '"+role+"', '"+phone+"', '"+req.file.originalname+"', '"+brief+"')";
    con.query(myquery, function (err, result) {  
        if (err) throw err; 
        req.flash('success_msg', 'Agent Added Successfully.') 
        res.redirect('/dashboard/add_agent')
    });
};

const update_agent = async (req, res) => {
    const { agent_id, agent_name , facebook, twitter, instagram, phone, role } = req.body;
    
    if(req.file){
        const myquery = 
        "update agents set name ='"+agent_name+"',facebook ='"+facebook+"' ,twitter ='"+twitter+"' ,instagram ='"+instagram+"' , phone ='"+phone+"' , role ='"+role+"' , image='"+req.file.filename+"' where id = "+ agent_id;

        console.log(myquery)

        con.query(myquery, function (err, result) {  
            if (err) throw err;
            res.json({ result : result });
        });
    }else{
        const myquery = 
        "update agents set name ='"+agent_name+"' where id = "+ agent_id;
        con.query(myquery, function (err, result) {  
            if (err) throw err;
            res.json({ result : result });
        });
    }
};

const delete_agent = async (req, res) => {
    const { agent_id } = req.body;

    const myquery = 
    "delete from agents where id = "+ agent_id;

    console.log(myquery)

    con.query(myquery, function (err, result) {  
        if (err) throw err;
        res.json({ result : result });
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

const contact_list = async (req, res) => {
    const myquery = "SELECT * from contact"
    con.query(myquery, (err, contacts) => {  
        if (err) throw err;  
        if(contacts.length > 0){
            res.render('dashboard/contact_list' ,{contacts: contacts, name:'req.user.name', layout: 'dashboard/dashboard_layout' })
        }else{
            res.render('dashboard/contact_list' ,{contacts: [], name:'req.user.name', layout: 'dashboard/dashboard_layout' })
        }
    });
};

const subscribe_list = async (req, res) => {
    const myquery = "SELECT * from subscribe"
    con.query(myquery, (err, subscribes) => {  
        if (err) throw err;  
        if(subscribes.length > 0){
            res.render('dashboard/subscribe_list' , {subscribes: subscribes, name:'req.user.name', layout: 'dashboard/dashboard_layout' })
        }else{
            res.render('dashboard/subscribe_list' ,{subscribes: [], name:'req.user.name' , layout: 'dashboard/dashboard_layout' })
        }
    });
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
exports.update_property = update_property;
exports.delete_property = delete_property;

// Partners CRUD
exports.partner_list = partner_list;
exports.add_partner = add_partner;
exports.save_partner = save_partner;
exports.update_partner = update_partner;
exports.delete_partner = delete_partner;

// Agents CRUD
exports.agent_list = agent_list;
exports.add_agent = add_agent;
exports.save_agent = save_agent;
exports.update_agent = update_agent;
exports.delete_agent = delete_agent;


// Settings
exports.settings = settings;
exports.update_settings = update_settings;

// Subscribe && Contact
exports.contact_list = contact_list;
exports.subscribe_list = subscribe_list;