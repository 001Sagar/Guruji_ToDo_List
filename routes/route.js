const route = require('express').Router();

const jwt = require('../utility/jsontoken');
const home = require('../controllers/todo_controller');
const usercontroller = require('../controllers/user')



route.post('/SignUp',usercontroller.SignUp);
route.post('/Login',usercontroller.login);
route.put('/update',jwt.authenticate,usercontroller.update);
route.delete('/delete',jwt.authenticate,usercontroller.delete);




route.post('/create',home.create);
route.post('/check',home.check);
route.put('/update',jwt.authenticate,home.update);
route.delete('/delete',jwt.authenticate,home.delete);

module.exports = route;