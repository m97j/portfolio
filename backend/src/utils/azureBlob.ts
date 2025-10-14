// backend/src/utils/azureBlob.ts
import {
  BlobServiceClient,
  StorageSharedKeyCredential,
  generateBlobSASQueryParameters,
  BlobSASPermissions,
  SASProtocol,
} from '@azure/storage-blob';

const accountName = process.env.AZURE_STORAGE_ACCOUNT!;
const accountKey = process.env.AZURE_STORAGE_KEY!;
const containerName = process.env.AZURE_CONTAINER || 'portfolio-media';

const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, sharedKeyCredential);
export const containerClient = blobServiceClient.getContainerClient(containerName);

export async function ensureContainer() {
  await containerClient.createIfNotExists({ access: 'blob' });
}

export function getUploadSas(blobName: string, minutes = 10) {
  const expiresOn = new Date(Date.now() + minutes * 60 * 1000);
  const sas = generateBlobSASQueryParameters(
    {
      containerName,
      blobName,
      expiresOn,
      permissions: BlobSASPermissions.parse('rwl'),
      protocol: SASProtocol.Https,
    },
    sharedKeyCredential
  ).toString();

  const url = `${containerClient.url}/${blobName}?${sas}`;
  return { uploadUrl: url, expiresOn };
}
