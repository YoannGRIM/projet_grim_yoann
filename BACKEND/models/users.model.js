module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define("users", {
   id: {
        type: Sequelize.STRING,
        primaryKey:true,
        allowNull: false
      },  
    nom: {
      type: Sequelize.STRING,
      allowNull: false
    },
    prenom: {
      type: Sequelize.STRING
      // allowNull defaults to true
    },    
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
    }
 });
return Users;
};
