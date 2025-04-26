const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./Media");
  },
  filename: (req, file, callback) => {
    callback(null, `image-${file.originalname}`);
  },
});

const multerMiddleWare = multer({ storage });

module.exports = multerMiddleWare;
