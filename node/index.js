const express = require('express')
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("./config/Database.js");
const sync = require("./models/tableSync")

const router = require("./routes/index.js");
const product = require("./routes/productroute");
dotenv.config();
var bodyParser = require('body-parser')
sync();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());
app.use("/", router);
app.use("/api", product)

app.listen(5000, () => console.log('Server running at port 5000'));