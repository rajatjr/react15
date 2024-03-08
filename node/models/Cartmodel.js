const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../config/Database");
const product = require('./Productmodel');
const Users = require('./UserModel')

const Cart = sequelize.define('rajat18_Cart', {
  // Model attributes are defined here

  Id:
  {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },


  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    reference: {
      model: Users,
      key: 'Id'
    }

  },

  ProductId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    reference: {
      model: product,
      key: 'Id'
    },
    required: true,

  },

  ProductCount: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,

  }

});

//// RELATIONS Between CART, USERS, AND PRODUCT TABLES ////

Users.hasMany(Cart, { foreignKey: 'userId' });
Cart.belongsTo(Users, { foreignKey: 'userId' });

product.hasMany(Cart, { foreignKey: 'ProductId' });
Cart.belongsTo(product, { foreignKey: 'ProductId' });






module.exports = Cart;