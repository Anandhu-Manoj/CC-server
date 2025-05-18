const express = require("express");

const cController = require("../Controllers/cController");
const multerMiddleWare = require("../Middleware/multerMiddleWare");
const cServices = require("../Controllers/cServiceController");
const serviceMulterMiddleWare = require("../Middleware/serviceMulterMiddleWare");
const officerController = require("../Controllers/OfficersController");
const criminalController = require("../Controllers/criminalControllers");
const auth = require("../Middleware/jwtMiddleware");
const leaveController = require("../Controllers/lController");
const PoliceServices = require("../Controllers/pServiceController");
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
  auth,
  serviceMulterMiddleWare.single("complaint"),
  cServices.serviceController
);

//getAllservices
router.get("/getServices", auth, cServices.getServices);

//adminlogin
router.post("/adminLogin", officerController.adminController);

//addingPoliceOfficer
router.post("/addPolice", auth, officerController.addPoliceOfficer);

//getofficersdata
router.get("/getPolice", auth, officerController.getOfficerDetails);

//deleteOfficer
router.delete("/officers/:id/delete", auth, officerController.deleteOfficer);

//adding criminals
router.post(
  "/addCriminals",
  auth,
  multerMiddleWare.single("criminalimage"),
  criminalController.AddCriminalController
);

//getAllcriminals

router.get("/getAllCriminals", auth, criminalController.getAllCriminalDetails);

//deletCriminals
router.delete("/criminal/:id/delete", auth, criminalController.deleteCriminals);

//deleteservices
router.delete("/Services/:id/delete", auth, cServices.deleteService);

//getSpeceficofficer

router.get("/getLoggedOfficer", auth, officerController.getSpeceficOfficer);

//postLeaves
router.post("/postLeaves", auth, leaveController.addLeave);

//getLeaves
router.get("/getAllLeaves", auth, leaveController.getLeaves);

//adding police services
router.post("/postPoliceServices", auth, PoliceServices.AddServices);

//gettingPoliceServices
router.get("/getPoliceServices", auth, PoliceServices.getPoliceServices);

//notification for accepting serveces
router.post(
  "/acceptingPoliceServices",
  auth,
  officerController.onAcceptOfficerServices
);

//clearNotification
router.patch(
  "/ClearingPoliceServices",
  auth,
  officerController.ClearNotification
);

//editOfficer
router.patch("/updateOfficer/:id", auth, officerController.editOfficer);

//editCriminals
router.patch(
  "/updateCriminals/:id",
  auth,
  multerMiddleWare.single("criminalimage"),
  criminalController.editCriminals
);

//assigningcasses
router.patch("/asignCasses/:id", auth, officerController.assignedCasses);

//dismissed casses
router.patch("/dismissedcassses", auth, officerController.dismissedCasses);

//getingserviceNotifivation
router.get("/getServiceNotification", auth, cController.getNotification);

//clear CivilianNotification

router.patch(
  "/ClearingCivilianNotification",
  auth,
  cController.ClearNotification
);

//on accepting local services
router.patch(
  "/onAcceptingLocalServices",
  auth,
  officerController.onAcceptlocalServices
);

//onaccepting
router.patch("/onacceptingleaves", auth, officerController.onManageLeaves);
//onReject
router.patch("/onrejectleaves", auth, officerController.rejectLeaves);

//onRejectLOcal service
router.patch('/onRejectPoliceService',auth,officerController.onRejectpoliceServices)
//appintment accept and reject
router.patch("/notifyAppointmentStatus", officerController.notifyAppointmentStatus);

//updatePropic
router.patch("/updataPropic",auth,multerMiddleWare.single("profileImg"),officerController.onUploadProfile)

module.exports = router;
