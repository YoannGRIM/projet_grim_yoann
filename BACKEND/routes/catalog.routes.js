const { checkJwt}  = require('./jwtMiddleware');

module.exports = app => {
    const catalog = require("../controllers/catalog.controllers.js");
  
    var router = require("express").Router();
  
    router.get("/", checkJwt,catalog.get);
  
    app.use('/api/catalog', router);
  };
