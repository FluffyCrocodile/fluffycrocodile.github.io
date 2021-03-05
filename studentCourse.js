module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getStudentCourse(res, mysql, context, complete){
        mysql.pool.query("SELECT * FROM StudentCourse", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.studentCourse = results;
            complete();
        });
    }

    function getStudents(res, mysql, context, complete){
        mysql.pool.query("SELECT * FROM Students", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.students = results;
            complete();
        });
    }

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
    

    /*Display all people. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteperson.js","filterfaculty.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        getCourses(res, mysql, context, complete);
        getStudents(res, mysql, context, complete);
        getStudentCourse(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('studentCourse', context);
            }
        }
    });


    
    // Add course
    router.post('/', function(req, res){
        console.log(req.body.studentID);
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO StudentCourse (fk_studentID, fk_courseID) VALUES (?,?)";
        var inserts = [req.body.studentID, req.body.courseID];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/studentCourse');
            }
        });
    });



    return router;
}();