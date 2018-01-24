var task = require('../controllers/tasks.js');

module.exports = function(app) {
  //=========================='GET' http://company.com/======================//
    app.get('/', function(req, res) {
      res.send("Welcome to my first API")
  })
  //=========================='GET' http://company.com/tasks======================//
  app.get('/tasks', function(req, res) {
      task.display(req,res);
  })
  //=========================='GET' http://company.com/tasks/7======================//
  app.get("/tasks/:id", function (req, res)  { 
      task.show(req,res);
  })
  //=========='POST' http://company.com/tasks(New task Object Included)=========//
  app.post("/tasks", function (req, res) { 
    task.create(req,res);
  })
  //======	'PUT' http://company.com/tasks/7(Updated tasks Object Included)=======//
  app.put("/tasks/:id",function  (req, res)  { 
    task.edit(req,res);
  })
  //==============='DELETE' http://company.com/tasks/7==========================//
  app.delete('/tasks/:id', function (req, res) { 
    task.destroy(req,res);
  })

}