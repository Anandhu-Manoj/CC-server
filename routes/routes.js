const express = require("express");

const cController = require("../Controllers/cController");
const multerMiddleWare = require("../Middleware/multerMiddleWare");
const cServices = require("../Controllers/cServiceController");
const serviceMulterMiddleWare = require("../Middleware/serviceMulterMiddleWare");
const officerController=require('../Controllers/OfficersController')
const criminalController=require('../Controllers/criminalControllers')

const router = express.Router();

router.post(
  "/register",
  multerMiddleWare.single("adhaarImg"),
  cController.regCivilianController
);
router.post("/login", cController.civilianLogin);

//service routes
router.post(
  "/serviceRegister",
  serviceMulterMiddleWare.single("complaint"),
  cServices.serviceController
);

//getAllservices
router.get('/getServices',cServices.getServices)


//adminlogin
router.post("/adminLogin",officerController.adminController)

module.exports = router;

//addingPoliceOfficer
router.post("/addPolice",officerController.addPoliceOfficer)

//getofficersdata
router.get("/getPolice",officerController.getOfficerDetails)

//deleteOfficer
router.delete('/officers/:id/delete',officerController.deleteOfficer)


//adding criminals
router.post('/addCriminals',multerMiddleWare.single('criminalimage'),criminalController.AddCriminalController)


//getAllcriminals

router.get('/getAllCriminals',criminalController.getAllCriminalDetails)


//deletCriminals
router.delete('/criminal/:id/delete',criminalController.deleteCriminals)

//deleteservices
router.delete('/Services/:id/delete',cServices.deleteService)

