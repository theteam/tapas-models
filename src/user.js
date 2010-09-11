var mongoose = require('../models/mongoose/mongoose').Mongoose;
var db = mongoose.connect('mongodb://localhost/tapas');

mongoose.model('User', {

    properties: ['first', 'last', 'age', 'updated_at'],

    cast: {
      age: Number,
      'nested.path': String
    },

    indexes: ['first'],

    setters: {
        first: function(v){
            return v.toLowerCase();
        }
    },

    getters: {
        full_name: function(){ 
            return this.first + ' ' + this.last; 
        }
    },

    methods: {
        save: function(fn){
            this.updated_at = new Date();
            this.__super__(fn);
        }
    },

    static: {
        findOldPeople: function(){
            return this.find({age: { '$gt': 70 }});
        }
    }

});

module.exports = db.model('User');
