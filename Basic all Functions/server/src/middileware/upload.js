const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {


      // Save with userId + extension (replaces old one for same user)
    const filename =  req.user.id + path.extname(file.originalname);

    // If file exists, delete it first (overwrite logic)
    const filePath = path.join("uploads", filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    cb(null, filename);
    
  }
});

const upload = multer({ storage });

module.exports = upload;
