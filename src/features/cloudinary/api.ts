import type { UploadSignature } from "@/features/place/types";
import type { CloudinaryUploadResult } from "./types";

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

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${signature.cloud_name}/image/upload`,
    { method: "POST", body: formData }
  );

  if (!response.ok) {
    throw new Error("Cloudinary upload failed");
  }

  return response.json() as Promise<CloudinaryUploadResult>;
};
