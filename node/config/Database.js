const Sequelize = require('sequelize')

const db = new Sequelize('db_sdirect', 'sdirect', 'Sm@rtPu92023', {
    host: "192.168.0.2",
    dialect: "mysql"
});

db.authenticate().then(async () => {
    console.log("Connection has been established Succesfully");
}).catch((e) => {
    console.log(e);
});

module.exports = db;