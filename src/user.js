var mongoose = require('../modules/mongoose/mongoose').Mongoose;
var db = mongoose.connect('mongodb://localhost/tapas');

mongoose.model('User', {

    'properties': ['username', 'first', 'last', 'phone', 'email', 'company', 'department', 'address',  'imageUri', 'bio', {'skills':[]}, {'clients':[]}, 'updated_at'],

    'indexes': ['first', 'last', [{'username':1},{unique: true}]],

    'getters': {
        full_name: function(){ 
            return this.first + ' ' + this.last; 
        }
    },

    'methods': {
        save: function(fn){
            this.updated_at = new Date();
            this.__super__(fn);
        }
    }

});

module.exports = db.model('User');
