const express = require("express");
const criminals = require("../Database/models/CriminalSchema");

exports.AddCriminalController = async (req, res) => {
  const {
    criminalname,
    criminalfathersName,
    CriminalIdentificationMark,
    CNumber,
    TotalYearsofSentence,
    AdmittedDate,
    RelievingDate,
  } = req.body;
  const criminalimage = req.file.filename;

  try {
    const existingCriminal = await criminals.findOne({ CNumber });

    if (existingCriminal) {
      res.status(409).json("existing criminal");
    } else {
      const newCriminal = new criminals({
        criminalimage,
        criminalname,
        criminalfathersName,
        CriminalIdentificationMark,
        CNumber,
        TotalYearsofSentence,
        AdmittedDate,
        RelievingDate,
      });
      await newCriminal.save();
      res.status(201).json({ message: "criminal added  succesfully" });
    }
  } catch (error) {
    res.status(500).json("server error");
    console.log(error);
  }
};

//get all criminals
exports.getAllCriminalDetails = async (req, res) => {
  try {
    const allCriminals = await criminals.find();
    res.status(200).json(allCriminals);
  } catch (error) {
    res.status(500).json("server error");
    console.log(error);
  }
};

//deleteController

exports.deleteCriminals = async (req, res) => {
  const id = req.params.id;
  try {
    const deleteCriminalData = await criminals.findByIdAndDelete({ _id: id });
    res.status(200).json(deleteCriminalData);
  } catch (error) {
    res.status(500).json("server error");
    console.log(error);
  }
};

//edit criminals
exports.editCriminals = async (req, res) => {
  const {
    criminalname,
    criminalfathersName,
    CriminalIdentificationMark,
    CNumber,
    TotalYearsofSentence,
    AdmittedDate,
    RelievingDate,
  } = req.body;
  

  const userId = req.params.id;
  try {
    await criminals.findOneAndUpdate(
      { _id: userId },
      {
        criminalname,
        criminalfathersName,
        CriminalIdentificationMark,
        CNumber,
        TotalYearsofSentence,
        AdmittedDate,
        RelievingDate,
      }, { new: true }
    );
    res.status(200).json("success");
  } catch (error) {
    res.status(500).json({ message: "server error" });
    console.log(error);
  }
};



