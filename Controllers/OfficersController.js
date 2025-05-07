const express = require("express");
const Officers = require("../Database/models/officersModel");
const { findOne } = require("../Database/models/userModel");
const officers = require("../Database/models/officersModel");
const PoliceServices = require("../Database/models/pServiceSchema");
const jwt = require("jsonwebtoken");
const pService = require("../Database/models/pServiceSchema");

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
  console.log(serviceId);
  const ServiceMessage = {
    id: Date.now(),
    message:
      serviceType == "Sports Club Booking"
        ? `your service request for Sports Club Booking applied on ${date.toLocaleString('en-IN')}  is approved `
        : `your service request for case details applied on ${date.toLocaleString('en-IN')}  is approved `,
  };

  try {
    await officers.findOneAndUpdate(
      { _id: userId },
      { $push: { Notification: ServiceMessage } }
    );
    await pService.findOneAndDelete({_id:serviceId})
    res.status(200).json("deleted successfully");
  } catch (error) {
    res.status(500).json("server error");
  }
};

//clear notification
exports.ClearNotification=async(req,res)=>{
  const UserId=req.userId
  try {
    await officers.findOneAndUpdate({_id:UserId},{$set:{Notification:[]}})
    res.status(200).json('deleted')

    
  } catch (error) {
    res.status(500).json({message:"serror error"})
    console.log(error)

    
  }

}

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
