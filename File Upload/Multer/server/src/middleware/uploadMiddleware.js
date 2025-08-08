const multer = require('multer');
const path = require('path');

// Storage Engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/uploads'); // folder to save images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// File Filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
