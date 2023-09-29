require("dotenv").config();
import { Storage } from "@google-cloud/storage";
import { logger } from "../logger/api.logger";
import { format } from "util";
import path from "path";

// Initialize Google Cloud Storage
const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  credentials: {
    private_key: process.env.GCP_PRIVATE_KEY,
    client_email: process.env.GCP_CLIENT_EMAIL,
  },
});

// Get a reference to the default bucket
const bucket = storage.bucket(config.gcp.bucketName);

// Function to generate a public URL for a file
const getFilePublicUrl = (key) =>
  format(`https://storage.googleapis.com/${bucket.name}/${key}`);

// Function to upload a file
const uploadFile = (file, userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const { originalname, buffer } = file;
      const ext = path.extname(originalname).toLowerCase();
      const key = `${userId}${ext}`;

      const blob = bucket.file(key);
      const blobStream = blob.createWriteStream({
        resumable: false,
      });

      logger.info("Uploading file");

      blobStream.on("finish", async () => {
        resolve(getFilePublicUrl(key));
        logger.info({
          message: "File uploaded",
          key,
          originalname,
        });
      });

      blobStream.on("error", (err) => {
        reject(`Unable to upload file, something went wrong`);
        logger.error(err);
      });

      blobStream.end(buffer);
    } catch (err) {
      reject(`Error during file upload: ${err.message}`);
      logger.error(err);
    }
  });

export { storage, bucket, uploadFile, getFilePublicUrl };
