const con = require('../app')

const home = async (req, res) => {
    const hero = "SELECT * FROM property limit 4"
    const featured = "SELECT * FROM property order by space limit 4"
    const top_rated = "SELECT * FROM property order by price limit 4"
    let hero_property = await con.query(hero, (err, result) => {
        if (err) throw err;  
        if(result.length > 0){
            // return result[0].data;
            res.render('home' ,{hero_property:result,featured_property:[],top_rated_property:[], title:'Home'})
        }
    });
    
    // console.log(hero_property)

    // let featured_property = await con.query(featured, (err, result) => {
    //     if (err) throw err;  
    //     if(result.length > 0){
    //         return result;
    //     }
    // });

    // let top_rated_property = await con.query(top_rated, (err, result) => {
    //     if (err) throw err;  
    //     if(result.length > 0){
    //         return result;
    //     }
    // });

    // res.render('home' ,{hero_property:hero_property,featured_property:featured_property,top_rated_property:top_rated_property, title:'Home'})
};

const about = (req, res) => {
    const myquery = "SELECT * FROM property"
    con.query(myquery, (err, result) => {  
        if (err) throw err;  
        if(result.length > 0){
            res.render('about' ,{result:result, title:'About Us'})
        }
    });
};

const contact = (req, res) => {
    const myquery = "SELECT * FROM property"
    con.query(myquery, (err, result) => {  
        if (err) throw err;  
        if(result.length > 0){
            res.render('contact' ,{result:result, title:'Contact Us'})
        }
    });
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
    // let errors = [];
    // const validation = validationResult(req)
    // if (!validation.isEmpty()) {
        
    //     validation.errors.forEach(element => {
    //         errors.push({msg: element.param+' '+element.msg});
    //     });

    //     return res.render('dashboard/add_agent', {
    //         errors,
    //         layout: 'dashboard/dashboard_layout',
    //         name: 'test'
    //     })
    //   }
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
    
    console.log(myquery);

    con.query(myquery, function (err, result) {  
        if (err) throw err; 
        // if(result.length > 0){
            res.render('property_list' ,{result:result, title:'Property List'})
            // res.redirect('/dashboard/property_list' ,{result:result, title:'Property List'})
        // }
    });
};

const property_list = async (req, res) => {
    let myquery = "SELECT * from property"
    
    con.query(myquery, function (err, result) {  
        if (err) throw err; 
        if(result.length > 0){
            res.render('property_list' ,{result:result, title:'Property List'})
        }
    });
};

exports.home = home;
exports.about = about;
exports.contact = contact;
exports.get_property = get_property;
exports.compare = compare;
exports.search = search;
exports.property_list = property_list;