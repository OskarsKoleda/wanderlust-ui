export interface CreatePictureInput {
  cloudinary_public_id: string;
  cloudinary_url: string;
  cloudinary_version: number;
  width: number;
  height: number;
  format: string;
  bytes: number;
  caption?: string | null;
  position?: number;
}

export type Picture = CreatePictureInput & {
  id: string;
  trip_id: string;
  place_id: string;
  created_at: string;
  updated_at: string;
};

export interface DestroySignature {
  signature: string;
  timestamp: number;
  public_id: string;
  api_key: string;
  cloud_name: string;
}

export type UploadSignature = DestroySignature & {
  folder: string;
};
