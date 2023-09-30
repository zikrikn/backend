const util = require("util");
const gc = require("../config/gcs.config");
const bucket = gc.bucket(process.env.GCP_BUCKET_NAME);

const uploadImage = async (file) => {
    const { originalname, buffer } = file;
  
    const blob = bucket.file(originalname.replace(/ /g, "_"));
    const blobStream = blob.createWriteStream({
      resumable: false
    });
  
    // Write the image data to the blob stream
    await blobStream.write(buffer);
  
    // Wait for the blob stream to finish writing
    await blobStream.finished;
  
    // Generate the public URL for the uploaded image
    const publicUrl = util.format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    );
  
    return publicUrl;
  };

module.exports = uploadImage;
