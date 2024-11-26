const {cloudinaryUploadImg,cloudinaryDeleteImg}=require("../utils/cloudinary")
const fs=require("fs");
const asyncHandler = require("express-async-handler");

const uploadImages = asyncHandler(async (req, res) => {
    try {
      const uploader = async (filePath) => await cloudinaryUploadImg(filePath, "images");
      const urls = [];
      const files = req.files;
  
      for (const file of files) {
        const { path: filePath } = file;
        const newPath = await uploader(filePath);
        urls.push(newPath);
  
        // Try to delete the file asynchronously
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Failed to delete file: ${filePath}. Error:`, err);
          } else {
            console.log(`Successfully deleted file: ${filePath}`);
          }
        });
      }
  const images=urls.map((file)=>{
    return file;
  })
  res.json(images);
    } catch (error) {
      console.error("Error uploading images:", error);
      throw new Error(error); 
    }
  });
  const deleteImages = asyncHandler(async (req, res) => {
    const {id}=req.params;
    try {
      const deleted = async (filePath) => await cloudinaryDeleteImg(id, "images");
      res.json({message:"Deleted"})
    } catch (error) {
      console.error("Error uploading images:", error);
      throw new Error(error); 
    }
  });

  module.exports={
    uploadImages,
    deleteImages
  }