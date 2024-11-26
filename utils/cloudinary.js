const cloudinary = require("cloudinary").v2; // Make sure you're using cloudinary's v2 API

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET_KEY,
});

const cloudinaryUploadImg = async (fileToUploads) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      fileToUploads,
      { resource_type: "auto" }, // Pass options here
      (error, result) => {
        if (error) {
          reject(error); // Reject the promise in case of an error
        } else {
          resolve({
            url: result.secure_url,
            asset_id: result.asset_id,
            public_id: result.public_id,
          });
        }
      }
    );
  });
};
const cloudinaryDeleteImg = async (fileToUploads) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(
      fileToDelete,
      { resource_type: "auto" }, // Pass options here
      (error, result) => {
        if (error) {
          reject(error); // Reject the promise in case of an error
        } else {
          resolve({
            url: result.secure_url,
            asset_id: result.asset_id,
            public_id: result.public_id,
          });
        }
      }
    );
  });
};

module.exports = { cloudinaryUploadImg , cloudinaryDeleteImg};
