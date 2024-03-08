const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../config/Database");
const product = require('./Productmodel');
const Users = require('./UserModel');
const Cart = require('./Cartmodel');


const Order = sequelize.define('rajat18_Orders', {
  Id:
  {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  /// Model attributes are defined here

  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    reference: {
      model: Users,
      key: "Id"
    }

  },

  ProductId: {
    type: Sequelize.INTEGER,
    reference: {
      model: product,
      key: "Id"
    }

  },

  ProductCount: {
    type: Sequelize.INTEGER,
    allowNull: false,
    reference: {
      model: Cart,
      key: "Id"
    }

  },

  TotalPrice: {
    type: Sequelize.INTEGER,
    allowNull: false,

  }

});

//// RELATIONS B/W ORDER, USERS, AND PRODUCT TABLES ////

Users.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(Users, { foreignKey: 'userId' });

product.hasMany(Order, { foreignKey: 'ProductId' });
Order.belongsTo(product, { foreignKey: 'ProductId' });


module.exports = Order;