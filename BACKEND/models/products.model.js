module.exports = (sequelize, Sequelize) => {
    const Products = sequelize.define("products", {
      id: {
          type: Sequelize.INTEGER,
          primaryKey:true,
          allowNull: false
        },  
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING
        // allowNull defaults to true
      },    
      price: {
          type: Sequelize.DOUBLE,
          allowNull: false
      },
    });
  return Products;
};
