const Sequelize = require("sequelize");
const db = require("../config/Database");

const { DataTypes } = Sequelize;

const Users = db.define('rajat18_users', {
    
    Id:
    {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },

});

module.exports = Users;