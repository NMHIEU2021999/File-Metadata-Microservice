'use strict';

var express = require('express');
var cors = require('cors');

// require and use "multer"...
var multer = require('multer');

var app = express();

app.use(cors());

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname);
  }
})
 
var upload = multer({ storage: storage })

app.post('/api/fileanalyse', upload.single('upfile'), (req, res, next) => {
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
    res.json({
      name:file.originalname,
      type:file.mimetype,
      size :file.size
    })
  
})



app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});



