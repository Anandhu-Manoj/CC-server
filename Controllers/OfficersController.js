const express = require("express");
const Officers = require("../Database/models/officersModel");
const { findOne } = require("../Database/models/userModel");
const officers = require("../Database/models/officersModel");

exports.adminController = async (req, res) => {
  const { email, role, password } = req.body;
  // if (!email || !role || !password) {
  //   res.status(400).json({ message: "email passwword and role are required" });
  // }
  try {
    const admin = await Officers.findOne({ email });
    console.log(admin);

    if (!admin) {
      return res.status(400).json({ message: "Incorrect email" });
    }

    if (admin.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Access denied. Only admin can login" });
    }
    if (admin.role === "admin") {
      if (admin.password == password) {
        console.log("success");
        return res
          .status(200)
          .json({ message: "Admin login successful", admin: admin });
      }
      if (admin.password !== password) {
        return res.status(401).json({ message: "Admin password incorrect" });
      }
    }
  } catch (error) {
    res.status(500).json(error);
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
    const findAllofficers= await officers.find();
    const AllOfficers=findAllofficers.filter((a)=>a.role!=="admin")
   res.status(200).json(AllOfficers);

  } catch (error) {
    res.status(500).json("server error");
    console.log(error);
  }
};

//delete officer details

exports.deleteOfficer=async(req,res)=>{
  const id=req.params.id
  try {
    const deleteOfficer=await officers.findByIdAndDelete({_id:id})

    res.status(200).json(deleteOfficer)
    
  } catch (error) {
    res.status(500).json({message:"server error"})
    
  }

}
