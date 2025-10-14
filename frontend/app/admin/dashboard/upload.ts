// frontend/app/admin/dashboard/upload.ts
export async function uploadToBlob(uploadUrl: string, file: File) {
  const res = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "x-ms-blob-type": "BlockBlob", "Content-Type": file.type || "application/octet-stream" },
    body: await file.arrayBuffer(),
  });
  if (!res.ok) throw new Error(await res.text());
  // Remove SAS query to get public URL (if container access is 'blob')
  return uploadUrl.split("?")[0];
}
