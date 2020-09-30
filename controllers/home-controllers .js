const con = require('../app')

const home = async (req, res) => {
    const myquery = "SELECT * FROM property"
    con.query(myquery, (err, result) => {  
        if (err) throw err;  
        if(result.length > 0){
            res.render('home' ,{result:result, title:'Home'})
        }
    });
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

exports.home = home;
exports.about = about;
exports.contact = contact;
exports.get_property = get_property;