export interface IDocumentUpload {
  fieldName?: string;
  filename?: string;
  fileDownloadUri?: string;
  hashkey?: string;
}

export const defaultValue: Readonly<IDocumentUpload> = {};
