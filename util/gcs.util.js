const util = require("util");
const gc = require("../config/gcs.config");
const bucket = gc.bucket(process.env.GCP_BUCKET_NAME);

const uploadImageProfile = async (file, sanitizedFullName) => {
  const { originalname, buffer } = file;
  const fileExtension = originalname.split('.').pop();
  const blobPath = `profile/${sanitizedFullName}.${fileExtension}`;

  const blob = bucket.file(blobPath);

  // Check if the file with the same name exists
  const [exists] = await blob.exists();

  if (exists) {
    // If the file exists, delete it before uploading the new one
    await blob.delete();
  }

  const blobStream = blob.createWriteStream({
    resumable: false,
  });

  await blobStream.write(buffer);
  await blobStream.end();

  const publicUrl = util.format(
    `https://storage.googleapis.com/${bucket.name}/${blob.name}`
  );

  return publicUrl;
};

module.exports = uploadImageProfile;