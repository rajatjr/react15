const express = require('express')
const { getUsers, Register, login, Logout, forget, changepassword } = require("../controllers/Users.js");
const { verifyToken } = require("../middleware/VerifyToken.js");
const { refreshToken } = require("../controllers/RefreshToken.js");
const router = express.Router();
router.get('/getUsers', verifyToken, getUsers);
router.post('/users', Register);
router.post('/login', login);
router.get('/token', refreshToken);
router.post('/logout', Logout);
router.post('/forget', forget);
router.post('/changepassword', changepassword);

module.exports = router;