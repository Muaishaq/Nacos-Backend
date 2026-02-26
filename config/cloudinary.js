const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  folder: 'nacos_uploads', // Optional: creates a folder in your Cloudinary account
  allowedFormats: ['jpg', 'png'], // Allows only jpg and png
  filename: (req, file, cb) => {
    cb(null, file.originalname); // The file on Cloudinary will have the same name as the original
  },
});

module.exports = { cloudinary, storage };