const { checkJwt}  = require('./jwtMiddleware');

module.exports = app => {
    const user = require("../controllers/user.controllers.js");
  
    var router = require("express").Router();

    router.post("/login", user.login);
    router.post("/register", user.register);
    router.put("/update", checkJwt, user.update);
    router.get("/get", checkJwt, user.get);
  
    app.use('/api/user', router);
  };
