module.exports = app => {  
  require("./catalog.routes")(app);
  require("./user.routes")(app);
}
