var express = require('express');
var path = require('path');
var router = express.Router();
var bodyParser = require('body-parser');
var compiler = require('compilex');
var option = {stats : true};
compiler.init(option);

router.get('/createTask', function(req, res) {
  var newTask = new Task();

  newTask.save(function( err, data) {
    if (err) {
      console.log(err);
      res.render('error');
    } else {
      res.redirect('/task/' + data._id);
    }
  })
});

router.get('/task/:id', function(req, res) {
  if (req.params.id) {
    Task.findOne({_id: req.params.id}, function(err, data) {
      if (err) {
        console.log(err);
        res.render('error');
      }

      if (data) {
        res.render('task', {data: data, roomId: data.id});
      } else {
        res.render('error');
      }
    })
  } else {
    res.render('error');
  }
});

router.get('/task' , function (req , res ) {

  res.sendFile( __dirname + "/task.hbs");


});


router.post('/compiled' , function (req , res ) {
    
  var code = req.body.code; 
  var input = req.body.input;
    var inputRadio = req.body.inputRadio;
    var lang = req.body.lang;
    if((lang === "C") || (lang === "C++"))
    {        
        if(inputRadio === "true")
        {    
          var envData = { OS : "windows" , cmd : "g++"};      
          compiler.compileCPPWithInput(envData , code ,input , function (data) {
            if(data.error)
            {
              res.send(data.error);       
            }
            else
            {
              res.send(data.output);
            }
          });
     }
     else
     {
      
      var envData = { OS : "windows" , cmd : "g++"};     
          compiler.compileCPP(envData , code , function (data) {
          if(data.error)
          {
            res.send(data.error);
          }     
          else
          {
            res.send(data.output);
          }
    
            });
     }
    }
    if(lang === "Java")
    {
        if(inputRadio === "true")
        {
            var envData = { OS : "windows" };     
            console.log(code);
            compiler.compileJavaWithInput( envData , code , function(data){
                res.send(data);
            });
        }
        else
        {
            var envData = { OS : "windows" };     
            console.log(code);
            compiler.compileJavaWithInput( envData , code , input ,  function(data){
                res.send(data);
            });

        }

    }
    if( lang === "Python")
    {
        if(inputRadio === "true")
        {
            var envData = { OS : "windows"};
            compiler.compilePythonWithInput(envData , code , input , function(data){
                res.send(data);
            });       
        }
        else
        {
            var envData = { OS : "windows"};
            compiler.compilePython(envData , code , function(data){
                res.send(data);
            });
        }
    }
    if( lang === "CS")
    {
        if(inputRadio === "true")
        {
            var envData = { OS : "windows"};
            compiler.compileCSWithInput(envData , code , input , function(data){
                res.send(data);
            });            
        }
        else
        {
            var envData = { OS : "windows"};
            compiler.compileCS(envData , code , function(data){
                res.send(data);
            });
        }

    }
    if( lang === "VB")
    {
        if(inputRadio === "true")
        {
            var envData = { OS : "windows"};
            compiler.compileVBWithInput(envData , code , input , function(data){
                res.send(data);
            });            
        }
        else
        {
            var envData = { OS : "windows"};
            compiler.compileVB(envData , code , function(data){
                res.send(data);
            });
        }

    }

});


router.get('/fullStat' , function(req , res ){
    compiler.fullStat(function(data){
        res.send(data);
    });
});

module.exports = router;