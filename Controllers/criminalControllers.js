const express = require("express");
const criminals = require("../Database/models/CriminalSchema");

exports.AddCriminalController = async (req, res) => {
  const {
    criminalimage,
    criminalname,
    criminalfathersName,
    CriminalIdentificationMark,
    CNumber,
    TotalYearsofSentence,
    AdmittedDate,
    RelievingDate,
  } = req.body;

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
    res.status(201).json({ message: "criminal addedsuccesfully" });
  }
    
  } catch (error) {
    res.status(500).json('server error')
    console.log(error)
    
  }

  
};
