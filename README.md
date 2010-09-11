Tapas Models
=============

This is intended to be used as a commonJS module and is for wrapping data models and abstracting any associated data storage.  In this case, this module uses mongodb through the accessor Mongoose.

Usage
-----

Models available:

* User
* News

  	var User = require('./tapas-models').User;
  	var user = new User();
	user.first = req.body.first;
	user.last = req.body.last;
	user.age = req.body.age;
	user.save(function(){
		logger.info('user ' + user.full_name + ' saved');
		res.redirect('/user/' + user.first);
	});

Compile-Time Dependencies
-------------------------

* ndistro

### ndistro

Dependencies are all managed from [nDistro](http://github.com/visionmedia/ndistro) so that all files are copied and executed in a relative directory, making the application self contained without requiring the need to add modules to the system.  This is desirable as we may have many applications requiring different versions on the same server.

A copy of ndistro will need to be installed, instructions are on the project page.

Run-Time Dependencies
---------------------

Database
--------

Dependency:- [Mongoose](http://www.learnboost.com/mongoose/)

Data storage is through the document storage application, MongoDB.  The application uses Mongoose, a wrapper around [node-mongodb-native](http://github.com/christkv/node-mongodb-native) which provides a nice model abstraction from the database.

Known Issues:- 

Using ndistro for dependencies doesn't bring down Git submodules, which Mongoose uses.  This means a clean checkout won't work after running ndistro.  To get around this for now, download the latest [tarball](http://github.com/christkv/node-mongodb-native/downloads) and expand into modules/mongoose/lib/support/node-mongodb-native.