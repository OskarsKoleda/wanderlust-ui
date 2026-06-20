import type { CloudinaryUploadResult } from "./types";
import type {
  DestroySignature,
  Picture,
  UploadSignature,
} from "../picture/types";

export const uploadToCloudinary = async (
  file: File,
  signature: UploadSignature
): Promise<CloudinaryUploadResult> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("signature", signature.signature);
  formData.append("timestamp", String(signature.timestamp));
  formData.append("public_id", signature.public_id);
  formData.append("folder", signature.folder);
  formData.append("api_key", signature.api_key);

  const response = await cloudinaryRequest<CloudinaryUploadResult>(
    signature.cloud_name,
    "upload",
    formData
  );

  return response;
};

export const removeFromCloudinary = async (
  publicId: Picture["cloudinary_public_id"],
  signature: DestroySignature
): Promise<void> => {
  const formData = new FormData();
  formData.append("public_id", publicId);
  formData.append("signature", signature.signature);
  formData.append("timestamp", String(signature.timestamp));
  formData.append("api_key", signature.api_key);

  await cloudinaryRequest<{ result: string }>(
    signature.cloud_name,
    "destroy",
    formData
  );
};

const cloudinaryRequest = async <T>(
  cloudName: string,
  endpoint: string,
  fields: FormData
): Promise<T> => {
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/${endpoint}`,
    { method: "POST", body: fields }
  );

  if (!response.ok) {
    throw new Error(
      `Cloudinary error with ${endpoint}: ${response.statusText}`
    );
  }

  return response.json() as Promise<T>;
};
