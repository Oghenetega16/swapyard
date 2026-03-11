import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export type UploadedAsset = {
  url: string;
  public_id: string;
  width?: number;
  height?: number;
  format?: string;
};

function getFolder(subfolder?: string) {
  const base = process.env.CLOUDINARY_FOLDER || "swapyard";
  return subfolder ? `${base}/${subfolder}` : base;
}

export async function uploadOneImageFile(
  file: File,
  opts?: { subfolder?: string }
): Promise<UploadedAsset> {
  const bytes = await file.arrayBuffer();
  const base64 = Buffer.from(bytes).toString("base64");
  const dataUrl = `data:${file.type};base64,${base64}`;

  const res = await cloudinary.uploader.upload(dataUrl, {
    folder: getFolder(opts?.subfolder),
    resource_type: "image",
  });

  return {
    url: res.secure_url,
    public_id: res.public_id,
    width: res.width,
    height: res.height,
    format: res.format,
  };
}

export async function uploadManyImageFiles(
  files: File[],
  opts?: { subfolder?: string }
): Promise<UploadedAsset[]> {
  return Promise.all(files.map((f) => uploadOneImageFile(f, opts)));
}

export async function deleteImageByPublicId(publicId: string) {
  return cloudinary.uploader.destroy(publicId, { resource_type: "image" });
}

export async function deleteManyByPublicIds(publicIds: string[]) {
  const ids = publicIds.filter(Boolean);
  if (!ids.length) return [];
  return Promise.all(ids.map((id) => deleteImageByPublicId(id)));
}

