const express = require("express");
const services = require("../Database/models/serviceModel");
const { findByIdAndDelete } = require("../Database/models/officersModel");
const users = require("../Database/models/userModel");

exports.serviceController = async (req, res) => {
  console.log(req.body);
  const {
    name,
    fathersname,
    Date,
    number,
    description,
    criminalname,
    visitingreason,
    relationship,
    visitingtime,
    serviceType,
  } = req.body;
  const complaint = req.file ? req.file.filename : null;
  const userId=req.userId;

  try {
    const newService = new services({
      name,
      fathersname,
      Date,
      number,
      complaint,
      description,
      criminalname,
      visitingreason,
      relationship,
      visitingtime,
      serviceType,
      userId
    });

    newService.save();
    res.status(200).json(newService);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

//getservices
exports.getServices = async (req, res) => {
  try {
    const getServices = await services.find();
    res.status(200).json(getServices);
  } catch (error) {
    res.status(500).json("server error ");
  }
};

//deleteService
exports.deleteService = async (req, res) => {
  const {userId}=req.body
  try {
      const ServiceMessage = {
    id: Date.now(),
    message: "your Service request is rejected",
  };
    const id = req.params.id;
    const DeleteService = await services.findByIdAndDelete({ _id: id });
    await users.findOneAndUpdate({_id:userId},{$push:{Notification:ServiceMessage}}),

    res.status(200).json(DeleteService);
  } catch (error) {
    console.log(error);
    res.status(500).json("server error");
  }
};
