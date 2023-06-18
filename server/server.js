const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

// configs
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//routes
app.use("/client", require("./routes/client"));
app.use("/general", require("./routes/general"));
app.use("/management", require("./routes/management"));
app.use("/sales", require("./routes/sales"));

const PORT = process.env.PORT || 5000;

//data
const User = require("./models/User");
const Product = require("./models/Product");
const ProductStats = require("./models/ProductStats");
const { dataUser, dataProduct, dataProductStat } = require("./data/index");

mongoose
  .connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
  })
  .then(() => {
    // User.insertMany(dataUser) //to import mock data
    // Product.insertMany(dataProduct) //to import mock data
    // ProductStats.insertMany(dataProductStat) //to import mock data

    app.listen(PORT, () => console.log(`Connected to PORT: ${PORT}`));
  })
  .catch((err) => console.log(err));
