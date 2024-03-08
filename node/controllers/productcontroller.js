const product = require("../models/Productmodel")
const Cart = require("../models/Cartmodel")
const Order = require("../models/Ordermodel")
const { Op } = require("sequelize")


/////////   ADD PRODUCT  TO DASHBOARD  MODEL ///////////////

exports.addProducts = async (req, res) => {
    
    try {
        const { productName, productPrice, category, userId } = req.body;
        console.log('userid', userId)

        console.log("hey:", req.body);
        const Seq = await product.create({ productName, productPrice, category, userId })

        res.json({ success: true, Seq })
        console.log(Seq)
    } catch (error) {
        console.log(error)
    }
}


/////////   GET PRODUCT  TO DASHBOARD  MODEL /////////////// 

exports.getProducts = async (req, res) => {
    try {

        const data = await product.findAll({
            where: {
                userId: req.query.user_id
            }
        });
        return res.status(200).json({ data: data })

    } catch (error) {
        console.log(error)
    }

}

/////////   SEARCH PRODUCT  FROM  DASHBOARD  MODEL ///////////////

exports.searchapi = async (req, res) => {
    try {

        const { productName } = req.query;
        console.log(req.query)

        const results = await product.findAll({
            where: {
                [Op.and]: [
                    { userId: req.query.user_id },

                    {
                        productName: {
                            [Op.like]: `%${productName}%`
                        }
                    }
                ]
            }
        })
        return res.json({ success: true, products: results })
    } catch (error) {

    }
}

/////////   DELETE PRODUCT  FROM DASHBOARD  MODEL ///////////////

exports.Delete = async (req, res) => {
    try {
        const dlt = await product.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.json(dlt)
    }
    catch (error) {
        console.error(error)
        res.status(404).json({ message: "error" })
    }
}


//// ADD  PRODUCTS TO CART IN CART MODEL---------------------------------------------

exports.AddtoCart = async (req, res) => {
    console.log("body:", req.body)
    try {
        const { userId, id, ProductCount } = req.body;
        const existing = await Cart.findOne({
            userId: userId,
            ProductId: id,
        })

        if (existing) {
            await existing.update({

                ProductCount: ProductCount,
                ProductId: id,

            });
            return res.json({ success: true, msg: "updated" })

        } else {

            await Cart.create({
                userId: userId,
                ProductId: id,
                ProductCount: ProductCount

            });
            return res.json({ success: true, msg: "Product Added To The Cart" })
        }

    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}



///////   DELETE FROM CART IN CART MODEL  ///////

exports.Delete1 = async (req, res) => {
    req.params.id
    try {
        const dlt = await Cart.destroy({
            where: {
                Id: req.params.id,
            },
        });
        res.json(dlt)
    }
    catch (error) {
        console.error(error)
        res.status(404).json({ message: "error" })
    }
}


////// GET PRODUCT FROM  CART IN CART MODEL ///////////////

exports.getProductsfromcart = async (req, res) => {
    try {

        const data = await Cart.findAll({
            where: {
                userId: req.query.user_id
            },
            include:
            {
                model: product
            }

        });
        return res.status(200).json({ data: data })

    } catch (error) {
        console.log(error)
    }
}



/////////// ADD PRODUCT TO ORDER MODEL   /////////////////

exports.Addorder = async (req, res) => {
    try {

        const { data } = req.body;
        console.log("data in order  controller:", data)
        console.log(data)
        {
            data && data.length > 0 && data.map(async (dataObj) => {

                await Order.create({
                    userId: dataObj.userId,
                    ProductId: dataObj.ProductId,
                    ProductCount: dataObj.ProductCount,
                    TotalPrice: dataObj.ProductCount * dataObj.rajat18_product.productPrice
                });

                await Cart.destroy({
                    where: {
                        userId: dataObj.userId,
                        ProductId: dataObj.ProductId
                    }

                })

            })
        }

        return res.json({ success: true, msg: " your order has been Placed Succesfully" })
    } catch (error) {
        return res.json({ success: false, msg: "order not placed" })
    }
}


////// GET PRODUCT FROM  CART IN CART MODEL    //////////////

exports.getProductsfromOrder = async (req, res) => {
    try {

        const data = await Order.findAll({
            where: {
                userId: req.query.user_id
            },
            include:
            {
                model: product
            }

        });
        return res.status(200).json({ data: data })

    } catch (error) {
        console.log(error)
    }
}


///////   DELETE PRODUCTS FROM ORDER IN ORDER MODEL ////////////

exports.DeleteOrder = async (req, res) => {
    const { id } = req.query
    try {
        const dlt = await Order.destroy({
            where: {
                Id: id,
            },
        });
        res.json(dlt)
    }
    catch (error) {
        console.error(error)
        res.status(404).json({ message: "error" })
    }
}
