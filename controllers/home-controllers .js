const con = require('../app')
const { validationResult } = require('express-validator');


function get_hero_property(){
    return new Promise((resolve, reject) => {
        const hero = "SELECT * FROM property limit 4"
        con.query(hero, function (err, result){
            if (err){
                console.log("Error: " + err);
                reject(err);
            }
            resolve(result)
        })
    })
}

function get_featured_property(){
    return new Promise((resolve, reject) => {
        const featured = "SELECT * FROM property order by space limit 4"
        con.query(featured, function (err, result){
            if (err){
                console.log("Error: " + err);
                reject(err);
            }
            resolve(result)
        })
    })
}

function get_top_rated_property(){
    return new Promise((resolve, reject) => {
        const top_rated = "SELECT * FROM property order by price limit 4"
        con.query(top_rated, function (err, result){
            if (err){
                console.log("Garden Error: " + err);
                reject(err);
            }
            resolve(result)
        })
    })
}

function get_partner(){
    return new Promise((resolve, reject) => {
        const top_rated = "SELECT * FROM partners"
        con.query(top_rated, function (err, result){
            if (err){
                console.log("Garden Error: " + err);
                reject(err);
            }
            resolve(result)
        })
    })
}

function get_agents(){
    return new Promise((resolve, reject) => {
        const top_rated = "SELECT * FROM agents"
        con.query(top_rated, function (err, result){
            if (err){
                console.log("Garden Error: " + err);
                reject(err);
            }
            resolve(result)
        })
    })
}

function get_top_agents(){
    return new Promise((resolve, reject) => {
        const top_rated = "SELECT * FROM agents limit 3"
        con.query(top_rated, function (err, result){
            if (err){
                console.log("Garden Error: " + err);
                reject(err);
            }
            resolve(result)
        })
    })
}

function get_properties(){
    return new Promise((resolve, reject) => {
        const property = "SELECT * FROM property"
        con.query(property, function (err, result){
            if (err){
                console.log("Error: " + err);
                reject(err);
            }
            resolve(result)
        })
    })
}

const home = async (req, res) => {
    let hero_property = await get_hero_property()
    let featured_property = await get_featured_property()
    let top_rated_property = await get_top_rated_property()
    let partners = await get_partner()
    let agents = await get_agents()
    
    res.render('home' 
    ,{hero_property:hero_property,featured_property:featured_property,top_rated_property:top_rated_property
        ,partners:partners,agents:agents, title:'Home'})
};

const about = async (req, res) => {
    let partners = await get_partner()
    let agents = await get_agents()
    res.render('about' ,{ partners:partners, agents:agents, title:'About Us'})
};

const contact = async (req, res) => {
    let partners = await get_partner()
    res.render('contact' ,{ partners:partners, title:'Contact Us'})
};

const news = async (req, res) => {
    let partners = await get_partner()
    res.render('news' ,{ partners:partners, title:'News'})
};

const get_property = (req, res) => {
    const myquery = "SELECT * from property WHERE property.id = " + "'"+req.params.id+"' LIMIT 1"
    con.query(myquery, (err, property) => {  
        if (err) throw err;  
        if(property.length > 0){
            query2 = "SELECT * from images WHERE property_id = " + "'"+req.params.id+"'"
            con.query(query2, (err, gallery) => {  
                if (err) throw err;
                console.log(gallery.length);
                res.render('property' ,{property:property, gallery:gallery, title:'Property Details'})
            });
        }else{
            
        }
    });
};

const compare = (req, res) => {
    const myquery = "SELECT * FROM property limit 8"
    con.query(myquery, (err, result) => {  
        if (err) throw err;  
        if(result.length > 0){
            res.render('compare' ,{result:result, title:'Compare'})
        }
    });
};

const search = async (req, res) => {
    const { type, room, bath, furniture_type, price, space } = req.body;
    
    let myquery = "SELECT * from property where 1 = 0"
    if(type !== null && type !== '')
        myquery = myquery + " OR type = " + " '"+type+"' " ;
    if(room !== null && room !== '')
        myquery = myquery + " OR rooms = " + " '"+room+"' " ;
    if(bath !== null && bath !== '')
        myquery = myquery + " OR bath = " + " '"+bath+"' " ;
    if(furniture_type !== null && furniture_type !== '')
        myquery = myquery + " OR furniture_type = " + " '"+furniture_type+"' " ;
    if(price !== null && price !== ''){
        matches1 = price.match(/\d+/g); 
        myquery = myquery + " OR price BETWEEN " + " "+matches1[0]+" " + " AND " + " "+matches1[1]+" " ;
    }
    if(space !== null && space !== ''){
        matches2 = space.match(/\d+/g); 
        myquery = myquery + " OR space BETWEEN " + " "+matches2[0]+" " + " AND " + " "+matches2[1]+" " ;
    }
    
    let partners = await get_partner()
    let top_agents = await get_top_agents()

    con.query(myquery, function (err, result) {  
        if (err) throw err; 
            res.render('property_list' ,{properties:result, partners:partners, top_agents:top_agents,  title:'Property List'})
    });
};

const property_list = async (req, res) => {
    let partners = await get_partner()
    let properties = await get_properties()
    let top_agents = await get_top_agents()
    res.render('property_list' ,{ properties:properties, partners:partners, top_agents:top_agents, title:'Property List'} )
};

const subscribe = async (req, res) => {
    const { email } = req.body;
    
    let errors = [];
    const validation = validationResult(req)
    if (!validation.isEmpty()) {
        validation.errors.forEach(element => {
            errors.push({msg: element.msg});
        });
        return res.json({ value: false , errors : errors });
    }

    const myquery = 
    "INSERT INTO subscribe ( email ) VALUES ('"+email+"')";
    con.query(myquery, function (err, result) {  
        if (err) throw err; 
        return res.json({ value: true , result : result });
    });

};

const contact_form = async (req, res) => {
    const { name, email, message, title } = req.body;
    
    const myquery = 
    "INSERT INTO contact ( name, email, message, title ) VALUES ('"+name+"', '"+email+"' ,'"+message+"' ,'"+title+"' )";
    con.query(myquery, function (err, result) {  
        if (err) throw err; 
        return res.json({ value: true , result : result });
    });

};

exports.home = home;
exports.about = about;
exports.contact = contact;
exports.news = news;
exports.get_property = get_property;
exports.compare = compare;
exports.search = search;
exports.property_list = property_list;
exports.subscribe = subscribe;
exports.contact_form = contact_form;