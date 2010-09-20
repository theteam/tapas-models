var mongoose = require('../modules/mongoose/mongoose').Mongoose;
var db = mongoose.connect('mongodb://localhost/tapas');

mongoose.model('Client', {

    'properties': ['slug', 'full_name', 'updated_at'],

    'indexes': ['full_name', [{'slug':1},{unique: true}]],

 	'setters': {
        slug: function(value){
            return value.toLowerCase().replace(' ', '-');
        }
    },

    'methods': {
        save: function(fn){
            this.updated_at = new Date();
            this.__super__(fn);
        }
    }

});

module.exports = db.model('Client');
