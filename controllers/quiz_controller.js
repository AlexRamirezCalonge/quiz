var models = require('../models/models.js');

//Autoload - factoriza el codigo si ruta incluye :quizId
exports.load = function(req, res, next, quizId){
  models.Quiz.find(quizId).then(
    function(quiz) {
      if(quiz) {
        req.quiz = quiz;
        next();
      } else { next(new Error('No existe quizId=' + quizId)); }
    }
  ).catch(function(error) {next(error);});
};

// GET /quizes/:id
exports.show = function(req, res) {
    res.render('quizes/show', {quiz: req.quiz});
};

// GET /author
exports.author = function(req, res) {
    res.render('author');
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
  var resultado = 'Incorrecto';
    if (req.query.respuesta === req.quiz.respuesta){
      resultado= 'Correcto';
    }
    res.render('quizes/answer', { quiz: req.quiz, respuesta: resultado});
};

//GET /quizes
exports.index = function(req, res){

var q1=req.query.search||"";
var q=q1.replace(/\s/g,'%');
q='%'+q+'%';

  models.Quiz.findAll({where: ["pregunta like ?", q], order: [['pregunta','ASC']]}).then(
     function(quizes){
       res.render('quizes/index.ejs', { quizes: quizes, 
                                        //search: search,
                                        title: 'Quiz'});
     }
  ).catch(function(error) { next(error);}) 
};
