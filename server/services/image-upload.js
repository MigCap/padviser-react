const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const config = require('../config');

aws.config.update({
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  region: 'us-east-2'
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png'
  ) {
    cb(null, true);
  } else {
    cb(
      new Error('Invalid file type. Only JPEG, JPG or PNG are allowed!'),
      false
    );
  }
};

const upload = multer({
  fileFilter,
  storage: multerS3({
    acl: 'public-read',
    s3,
    bucket: 'pa-dev-react',
    metadata: function(req, file, cb) {
      cb(null, { fieldName: 'TESTING METADATA' });
    },
    key: function(req, file, cb) {
      cb(null, Date.now().toString());
    }
  })
});

module.exports = upload;
