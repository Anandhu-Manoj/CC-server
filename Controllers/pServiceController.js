const policeServices = require("../Database/models/pServiceSchema");

exports.AddServices = async (req, res) => {
  const { serviceType, name, Date, number, details } = req.body;
  const userId=req.userId


  try {
    const newServices = new policeServices({
      serviceType,
      name,
      Date,
      number,
      details,
      userId
    });

    await newServices.save();
    res.status(200).json(newServices);
  } catch (error) {
    res.status(500).json("server error");
  }
};

exports.getPoliceServices = async (req, res) => {
  try {
    const existingUser = await policeServices.find();
    res.status(200).json(existingUser);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};
