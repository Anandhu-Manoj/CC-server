const express = require("express");
const Officers = require("../Database/models/officersModel");
const officers = require("../Database/models/officersModel");
const PoliceServices = require("../Database/models/pServiceSchema");
const jwt = require("jsonwebtoken");
const pService = require("../Database/models/pServiceSchema");
const services = require("../Database/models/serviceModel");
const civilians = require("../Database/models/userModel");
const users = require("../Database/models/userModel");
const leaves = require("../Database/models/LeaveModel");

exports.adminController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingOfficer = await officers.findOne({ email, password });
    if (existingOfficer) {
      const token = jwt.sign(
        { userId: existingOfficer._id },
        process.env.JWTSECRETKEY
      );
      res.status(200).json({ role: existingOfficer.role, token: token });
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (error) {
    res.status(500).json("server error");
  }
};

//adding police officer
exports.addPoliceOfficer = async (req, res) => {
  const {
    role,
    email,
    password,
    username,
    fathersname,
    batchNo,
    number,
    designation,
    circleofduty,
    serviceperiod,
  } = req.body;
  try {
    const existingOfficer = await officers.findOne({ email });
    if (existingOfficer) {
      res.status(409).json({ message: "existing user please check" });
    } else {
      const newOfficer = new officers({
        role,
        email,
        password,
        username,
        fathersname,
        batchNo,
        number,
        designation,
        circleofduty,
        serviceperiod,
      });

      await newOfficer.save();
      res.status(201).json(newOfficer);
    }
  } catch (error) {
    res.status(500).json("server error ");
  }
};

//get officer Details

exports.getOfficerDetails = async (req, res) => {
  try {
    const findAllofficers = await officers.find();
    const AllOfficers = findAllofficers.filter((a) => a.role !== "admin");
    res.status(200).json(AllOfficers);
  } catch (error) {
    res.status(500).json("server error");
    console.log(error);
  }
};

//delete officer details

exports.deleteOfficer = async (req, res) => {
  const id = req.params.id;
  try {
    const deleteOfficer = await officers.findByIdAndDelete({ _id: id });

    res.status(200).json(deleteOfficer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};

//getSpeceficofficer

exports.getSpeceficOfficer = async (req, res) => {
  const userId = req.userId;

  try {
    const speceficOfficer = await officers.findOne({ _id: userId });
    res.status(200).json(speceficOfficer);
  } catch (error) {
    res.status(500).json("server error");
  }
};

//onaccepting

exports.onAcceptOfficerServices = async (req, res) => {
  const { serviceId, userId, serviceType, date } = req.body;
  const ServiceMessage = {
    id: Date.now(),
    message:
      serviceType == "Sports Club Booking"
        ? `your service request for Sports Club Booking applied on ${date.toLocaleString(
            "en-IN"
          )}  is approved `
        : `your service request for case details applied on ${date.toLocaleString(
            "en-IN"
          )}  is approved `,
  };

  try {
    await officers.findOneAndUpdate(
      { _id: userId },
      { $push: { Notification: ServiceMessage } }
    );
    await pService.findOneAndDelete({ _id: serviceId });
    res.status(200).json("deleted successfully");
  } catch (error) {
    res.status(500).json("server error");
  }
};

//clear notification
exports.ClearNotification = async (req, res) => {
  const UserId = req.userId;
  try {
    await officers.findOneAndUpdate(
      { _id: UserId },
      { $set: { Notification: [] } }
    );
    res.status(200).json("deleted");
  } catch (error) {
    res.status(500).json({ message: "serror error" });
    console.log(error);
  }
};

//patchController
exports.editOfficer = async (req, res) => {
  const {
    email,
    password,
    username,
    fathersname,
    batchNo,
    number,
    designation,
    circleofduty,
    serviceperiod,
  } = req.body;

  const userId = req.params.id;

  try {
    await officers.findOneAndUpdate(
      { _id: userId },
      {
        email,
        password,
        username,
        fathersname,
        batchNo,
        number,
        designation,
        circleofduty,
        serviceperiod,
      }
    );
    res.status(200).json("success");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//view Assigned casses
exports.assignedCasses = async (req, res) => {
  const userId = req.params.id;

  const { serviceId, link } = req.body;
  try {
    const ServiceMessage = {
      id: Date.now(),
      message:
        "This case is assigned to your station check out the link for futher details and update the panel ASAP",
      link: link,
    };
    await officers.findOneAndUpdate(
      { _id: userId },
      { $push: { Notification: ServiceMessage } }
    );
    await services.findOneAndDelete({ _id: serviceId });
    res.status(200).json("success");
  } catch (error) {
    res.status(500).json("server error");
  }
};

//dismissing case

exports.dismissedCasses = async (req, res) => {
  const { serviceId, userId } = req.body;

  try {
    const ServiceMessage = {
      id: Date.now(),
      message: "The case has been dismissed",
    };
    await civilians.findOneAndUpdate(
      { _id: userId },
      { $push: { Notification: ServiceMessage } }
    );
    await services.findOneAndDelete({ _id: serviceId });
    res.status(200).json("success");
  } catch (error) {
    res.status(500).json("server error");
  }
};

//onacceptserviceReq
exports.onAcceptlocalServices = async (req, res) => {
  const { serviceId, userId, serviceType, date } = req.body;
  const ServiceMessage = {
    id: Date.now(),
    message: "your service request is accepted officer will contact you",
  };

  try {
    await users.findOneAndUpdate(
      { _id: userId },
      { $push: { Notification: ServiceMessage } }
    );
    await services.findOneAndDelete({ _id: serviceId });
    res.status(200).json("deleted successfully");
  } catch (error) {
    res.status(500).json("server error");
  }
};
//onarejectingserviceReq
exports.onRejectpoliceServices = async (req, res) => {
  const { serviceId, userId, serviceType, date } = req.body;
  console.log(req.body)
  const ServiceMessage = {
    id: Date.now(),
    message: "your service request is rejected ",
  };

  try {
    await officers.findOneAndUpdate(
      { _id: userId },
      { $push: { Notification: ServiceMessage } }
    );
    await pService.findOneAndDelete({ _id: serviceId });
    res.status(200).json("deleted successfully");
  } catch (error) {
    res.status(500).json("server error");
  }
};

//acceptying leave

exports.onManageLeaves = async (req, res) => {
  const { userId, _id } = req.body;
  console.log(req.body)
  const ServiceMessage = {
    id: Date.now(),
    message: "your leave request is accepted",
  };

  try {
    await officers.findOneAndUpdate(
      { _id: userId },
      { $push: { Notification: ServiceMessage } }
    );
    await leaves.findOneAndDelete({ _id: _id });
    res.status(200).json("deleted successfully");
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
};

//ondelete leaves
exports.rejectLeaves = async (req, res) => {
  const { userId, _id } = req.body;
  const ServiceMessage = {
    id: Date.now(),
    message: "your leave request is rejected",
  };

  try {
    await officers.findOneAndUpdate(
      { _id: userId },
      { $push: { Notification: ServiceMessage } }
    );
    await leaves.findOneAndDelete({ _id: _id });
    res.status(200).json("deleted successfully");
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
};
