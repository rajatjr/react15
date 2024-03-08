const router = require('express').Router();
const { Router } = require('express');
const { addProducts, getProducts, searchapi, Delete, AddtoCart, Delete1, getProductsfromcart, Addorder, getProductsfromOrder, DeleteOrder } = require('../controllers/productcontroller');


router.get('/', (req, res) => {
    res.send("product has been updated")
})

//  Add product to Daashboard model
router.post('/addProducts', addProducts);

//  Getting products From DASHBOARD  MODEL
router.get('/getProducts', getProducts);

//  Search api  form Dashboard Model
router.get('/searchapi', searchapi);

// DELETE a product from DASHBOARD  MODEL
router.delete('/delete/:id', Delete);

// DELETE a product from Cart Model
router.delete('/deleteorder/:id', Delete1);

// DELETE a product FROM ORDER TABLE
router.delete('/DeleteOrder', DeleteOrder);

// Add product to Cart Model
router.post('/addToCart', AddtoCart)


// GET product from Cart Model
router.get('/getProductsfromcart', getProductsfromcart)

// ADD PRODUCT TO ORDER MODEL
router.post('/addorder', Addorder)

// GET PRODUCT FROM  CART IN CART MODEL 
router.get('/getProductsfromOrder', getProductsfromOrder)

module.exports = router;