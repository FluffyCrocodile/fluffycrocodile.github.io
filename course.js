module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getCourses(res, mysql, context, complete){
        mysql.pool.query("SELECT * FROM Courses", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.course = results;
            complete();
        });
    }

    //router and list courses
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getCourses(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('course', context);
            }

        }
    });


    // Add course
    router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Courses (courseID, credits, course_name) VALUES (?,?,?)";
        var inserts = [req.body.courseID, req.body.credits, req.body.course_name];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/course');
            }
        });
    });

    return router;
}();
