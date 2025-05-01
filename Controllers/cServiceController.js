const express = require("express");
const services = require("../Database/models/serviceModel");

exports.serviceController = async (req, res) => {
  const {
    name,
    fathersname,
    Date,
    number,
    complaint,
    description,
    criminalname,
    visitingreason,
    relationship,
    visitingtime
  } = req.body;

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
      visitingtime
    });

    newService.save()
    res.status(200).json(newService)
  } catch (error) {
    res.status(500).json(error);
  }
};
