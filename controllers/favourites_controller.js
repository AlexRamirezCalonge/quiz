var models = require('../models/models.js');


// PUT /quizes/:userId/favourites/:quizId
exports.marcar = function(req,res,next){
	var direccion = (req.body.redir || '/user/' + req.user.id+ '/favourites');
	req.user.addFavourites(req.quiz).then(function(){
		res.redirect(direccion);
	}).catch(function(error){next(error);})
};



// DELETE /quizes/:userId/favourites/:quizId
exports.desmarcar = function(req,res,next){
	var direccion = (req.body.redir || '/user/' + req.user.id+ '/favourites');
	req.user.removeFavourites(req.quiz).then(function(){
		res.redirect(direccion);
	}).catch(function(error){next(error);})
};


// GET /quizes/:userId/favourites
exports.show = function(req,res,next){

	req.user.getFavourites().then(function(favourites){
		favourites.forEach(function(favourite){
			favourite.isFav =true;
		});
		res.render('quizes/index.ejs',{quizes:favourites, errors:[]});
	}).catch(function(error){ next(error);})

};
