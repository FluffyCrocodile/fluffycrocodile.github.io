module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getClubs(res, mysql, context, complete){
        mysql.pool.query("SELECT * FROM Clubs", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.clubs = results;
            complete();
        });
    }

    //router and list courses
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getClubs(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('clubs', context);
            }

        }
    });


    // Add course
    router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Clubs (clubID, club_name) VALUES (?,?)";
        var inserts = [req.body.clubID, req.body.club_name];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/clubs');
            }
        });
    });

    return router;
}();
