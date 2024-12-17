import { BlobServiceClient } from "@azure/storage-blob";
import ErrorResponse from "./errorResponse.util";
require("dotenv").config();

export const uploadFile = async (file: any) => {
  const { originalname: fileName, buffer } = file;

  // Create the BlobServiceClient object which will be used to create a container client
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    process.env.BLOB_CONNECTION_STRING
  );
  // Create a unique name for the container
  const containerName = "uploads";
  // Get a reference to a container
  const containerClient = blobServiceClient.getContainerClient(containerName);
  // Get a block blob client
  const blockBlobClient = containerClient.getBlockBlobClient(fileName);
  //  Check for duplicate files
  let blobs = containerClient.listBlobsFlat();
  for await (const blob of blobs) {
    if (blob.name === fileName) {
      throw new ErrorResponse("Duplicate File Exists.", 400);
    }
  }
  // Upload data to the blob
  const data = buffer;
  const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
  console.log(
    "Blob was uploaded successfully. requestId: ",
    JSON.stringify(uploadBlobResponse.requestId)
  );
};
