const route = require('express').Router();

const jwt = require('../utility/jsontoken');
const home = require('../controllers/todo_controller');
const usercontroller = require('../controllers/user')



route.post('/SignUp',usercontroller.SignUp);
route.post('/Login',usercontroller.login);
route.put('/updatepassword',jwt.authenticate,usercontroller.update);
route.delete('/delete',jwt.authenticate,usercontroller.delete);




route.post('/create',jwt.authenticate,home.create);
route.post('/check',jwt.authenticate,home.check);
route.put('/updatetask',jwt.authenticate,home.update);
route.delete('/deletetask',jwt.authenticate,home.delete);

module.exports = route;