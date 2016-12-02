var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var tesselController = require('./tesselController');
var timersController = require('./timersController');


module.exports = function(app){

    //Toggle pump and return response with pump state and list of active timers
  app.get('/pump/', function(req, res){

    tesselController.togglePump(function(){
      getCurrentState(function(state){
        res.send(state);
      })
  });
});

 // Add new timer return response with list of timers
  app.post('/timer/add/', jsonParser, function(req, res){

    timersController.addTimer(req.body)

    getCurrentState(function(state){
      res.send(state);
    })

  });

  app.post('/timer/remove/', jsonParser, function(req, res){

    timersController.removeTimer(req.body.time);

    getCurrentState(function(state){
      res.send(state);
    })
  });

  app.get('/getState/', function(req, res){

    tesselController.pumpState(function(state){
      res.send(state);
    });

  });
}

function getCurrentState(callback){
  var timers = timersController.getTimers();
  tesselController.pumpState(function(state){
    callback(JSON.stringify({on: state, timers: timers}));
  });
}
