const User = require("../models/User");


//@desc get user info
//@route GET /general/user/:id
//@access Private
const getUser = async (req, res) => {
  try {
    const {id} = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

module.exports = { getUser };
