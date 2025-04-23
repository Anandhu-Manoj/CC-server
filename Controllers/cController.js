const users = require("../Database/models/userModel");

exports.regCivilianController = async (req, res) => {
  const { username, password, img, email, address, aadharNo } = req.body;
  try {
    const existingUser = await users.findOne({ aadharNo });
    if (existingUser) {
      res.status(409).json("user already exist please login");
    } else {
      const newUser = new users({
        username,
        password,
        img,
        email,
        address,
        aadharNo,
      });
      await newUser.save();
      res.status(201).json(newUser
        
      )
    }
  } catch (error) {res.status(500).json(error)}
};
