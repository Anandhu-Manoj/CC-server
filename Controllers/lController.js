const leaves = require("../Database/models/LeaveModel");

exports.addLeave = async (req, res) => {
  const { leaveType, name, startDate, EndDate, circle, reason } = req.body;

  try {
        const Id=req.userId

    const newLeaveReq = new leaves({
      leaveType,
      name,
      startDate,
      EndDate,
      circle,
      reason,
      userId:Id

    });

    await newLeaveReq.save();
    res.status(201).json(newLeaveReq);
  } catch (error) {
    res.status(500).json("server error ");
    console.log(error);
  }
};

exports.getLeaves = async (req, res) => {
  try {
    const AllLeaves = await leaves.find();
    res.status(200).json(AllLeaves);
  } catch (error) {
    res.status(500).json("server error");
  }
};




