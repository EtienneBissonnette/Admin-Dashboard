const Product = require("../models/Product");
const ProductStats = require("../models/ProductStats");
const User = require("../models/User");
const Transaction = require("../models/Transaction");
const getCountryIso3 = require("country-iso-2-to-3");

//@desc get products
//@route GET /client/products/
//@access Public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const stats = await ProductStats.findOne({ productId: product._id });
        return { ...product._doc, stats };
      })
    );
    res.status(200).json(productsWithStats);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//@desc get customers
//@route GET /client/customers/
//@access Private
const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" }).select("-password");
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//@desc get transactions
//@route GET /client/transactions/
//@access Private
const getTransactions = async (req, res) => {
  try {
    //from mui DataGrid query
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    //for MongoDB queries
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };
      return sortFormatted;
    };

    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userID: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Transaction.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    res.status(200).json({ transactions, total });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getGeography = async (req, res) => {
  try {
    const users = await User.find();
    const mappedLocations = users.reduce((acc, { country }) => {
      const countryISO3 = getCountryIso3(country);

      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }

      acc[countryISO3]++;
      return acc;
    }, {});

    const formatedLocations = Object.entries(mappedLocations).map(
      ([country, count]) => ({ id: country, value: count })
    );

    res.status(200).json(formatedLocations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { getProducts, getCustomers, getTransactions, getGeography };
