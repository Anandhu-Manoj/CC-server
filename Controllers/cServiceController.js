const express = require("express");
const services = require("../Database/models/serviceModel");
const { findByIdAndDelete } = require("../Database/models/officersModel");

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
  try {
    const id = req.params.id;
    const DeleteService = await services.findByIdAndDelete({ _id: id });

    res.status(200).json(DeleteService);
  } catch (error) {
    console.log(error);
    res.status(500).json("server error");
  }
};
