const Users = require("./UserModel");
const product = require("./Productmodel");
const Cart = require("./Cartmodel");
const Order = require("./Ordermodel");

const sync = async () => {
    await Users.sync();
    await product.sync();
    await Cart.sync();
    await Order.sync();
};
module.exports = sync;