var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');
var userController = require('../controllers/user_controller');

//Autoload de comandos con :quizId
router.param('quizId', quizController.load); //autoload :quizId
router.param('commentId', commentController.load); //autoload :commentId
router.param('userId', userController.load); //autoload :userId

/* GET home page. */
router.get('/',sessionController.timeout, function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

//Definicion de rutas de sesion
router.get('/login',            sessionController.new);         //formulario login
router.post('/login',           sessionController.create);      //crear sesion
router.get('/logout',           sessionController.destroy);     //destruir sesion

//Definicion de rutas de cuenta
router.get('/user', userController.new);     //formulario sign in
router.post('/user', userController.create);  //registrar usuario
router.get('/user/:userId(\\d+)/edit',  sessionController.loginRequired, userController.edit);
router.put('/user/:userId(\\d+)', sessionController.loginRequired, userController.update);
router.delete('/user/:userId(\\d+)', sessionController.loginRequired, userController.destroy);

//Definicion de rutas de /quizes
router.get('/quizes',                      quizController.index,    sessionController.timeout);
router.get('/quizes/:quizId(\\d+)',        quizController.show,    sessionController.timeout);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer,    sessionController.timeout);
router.get('/quizes/new',                  sessionController.loginRequired, quizController.new,    sessionController.timeout);
router.post('/quizes/create',              sessionController.loginRequired, quizController.create,    sessionController.timeout);
router.get('/quizes/:quizId(\\d+)/edit',   sessionController.loginRequired, quizController.edit,    sessionController.timeout);
router.put('/quizes/:quizId(\\d+)',        sessionController.loginRequired, quizController.update,    sessionController.timeout);
router.delete('/quizes/:quizId(\\d+)',     sessionController.loginRequired, quizController.destroy,    sessionController.timeout);

//Definicion de rutas de comentarios
router.get('/quizes/:quizId(\\d+)/comments/new',   commentController.new,    sessionController.timeout);
router.post('/quizes/:quizId(\\d+)/comments',      commentController.create,    sessionController.timeout);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish',     sessionController.loginRequired,  commentController.publish,    sessionController.timeout);
 
router.get('/author', quizController.author,    sessionController.timeout);

router.get('/quizes/statistics', quizController.statistics,  commentController.statistics,    sessionController.timeout);

module.exports = router;
