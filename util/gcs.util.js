const util = require("util");
const gc = require("../config/gcs.config");
const bucket = gc.bucket(process.env.GCP_BUCKET_NAME);
const short = require("short-uuid");

const uploadImageProfile = async (file, sanitizedEmail) => {
  const { originalname, buffer } = file;
  const fileExtension = originalname.split(".").pop();
  const uuid = short().new();
  const blobPath = `profile/${sanitizedEmail}_${uuid}.${fileExtension}`;

  const blob = bucket.file(blobPath);
  const blobStream = blob.createWriteStream({
    resumable: false,
  });

  await blobStream.write(buffer);
  await blobStream.end();

  const publicUrl = util.format(
    `https://storage.googleapis.com/${bucket.name}/${blob.name}`,
  );

  return publicUrl;
};

module.exports = uploadImageProfile;
