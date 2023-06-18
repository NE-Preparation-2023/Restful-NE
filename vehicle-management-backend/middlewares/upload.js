const multer = require('multer');

// Specify the upload destination folder and filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Create multer upload instance
const upload = multer({ storage: storage });

module.exports = upload;
