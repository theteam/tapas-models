var mongoose = require('../modules/mongoose/mongoose').Mongoose;
var db = mongoose.connect('mongodb://localhost/tapas');
var crypto = require('crypto');

mongoose.model('User', {

    'properties': ['username', 'password', 'first', 'last', 'phone', 'email', 'company', 'department', 'address',  'imageUri', 'bio', {'skills':[]}, {'clients':[]}, 'updated_at'],

    'indexes': ['first', 'last', [{'username':1},{unique: true}]],

	'setters': {
		clients : function(c) {
			if (!(c instanceof Array)){
				var result = new Array();
				result[0] = c;
				return result;
			} else {
				return c;
			}
		}
	},

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
    },

	'static' : {
		encryptPassword : function(cleartext){
			return crypto.createHash('md5').update(cleartext).digest('hex');
		},
		validatePassword : function(cleartext, encoded){
			return crypto.createHash('md5').update(cleartext).digest('hex') === encoded;
		}
	}

});

module.exports = db.model('User');
