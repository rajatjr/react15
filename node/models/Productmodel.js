const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../config/Database");
const Users = require('./UserModel');

const product = sequelize.define('rajat18_product', {
  Id:
  {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  // Model attributes are defined here
  productName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  productPrice: {
    type: Sequelize.INTEGER,
    allowNull: false
    // allowNull defaults to true
  },

  category: {
    type: Sequelize.STRING,
    allowNull: false,

  },

  userId: {
    type: Sequelize.INTEGER,
    // allowNull: false,
    reference: {
      model: Users,
      key: "Id"
    },
    required: true,

  },

});

//// RELATIONS B/W  USERS, AND PRODUCT TABLES ////

Users.hasMany(product, {
  foreignKey: "userId",
});

product.belongsTo(Users, {
  foreignKey: "userId",
});



module.exports = product;