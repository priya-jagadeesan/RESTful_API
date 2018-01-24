var mongoose = require('mongoose');
var task = mongoose.model('Task');

module.exports = {
    display : function(req, res) {
        task.find({}, function(err, tasks) {
            if(err) {
                res.json({ message : 'error',  'data' : err.message });
            } else {  
                res.json( tasks );
            }
        })
    },
    create : function(req, res) {
        var new_task = new task({
            title : req.body.title, 
            description : req.body.description,
            completed : req.body.completed
        });

        new_task.save(function(err) {
        if(err) {
            res.json({ message : 'error',  'data' : err.message });
        } else { 
            res.redirect('/tasks');
        }
        })
    },

    show : function(req, res) {
        task.find({_id : req.params.id},  function(err, task) {
            if(err) {
                res.json({ message : 'error',  'data' : err.message });
            } else {  
                res.json( task );
            }
        })
    },
    edit : function(req, res) {
        task.findOne({ _id: req.params.id }, function (err, task) {
            if(err) {
                res.json({ message : 'error',  'data' : err.message });
            } else {  
            task.title = req.body.title;
            task.description = req.body.description;
            task.completed = req.body.completed;
        
            task.save(function(err) {
                if(err) {
                    res.json({ message : 'error',  'data' : err.message });
                } else { 
                    res.json({ message : 'success' });
                }
            });
            }
        });
    },

    destroy : function(req, res) {
        task.remove({ _id : req.params.id }, function(err) {
        if (err) {
            res.json({ message : 'error', 'data' : err.message });
        }
        else {
            res.json({ message : 'success' });
        }
        })  
    }
}