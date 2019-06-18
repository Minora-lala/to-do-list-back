module.exports = function(app){

    console.log('ROUTER MODULE STARTED');

    let testRoutes = require('../routes/test.routes');
    app.use('/test', testRoutes);

    let userRoutes = require('../routes/user.route');
    app.use('/user', userRoutes);
};