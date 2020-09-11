export interface IDocumentUpload {
  id?: string;
  fieldName?: string;
  filename?: string;
  fileDownloadUri?: string;
  hashkey?: string;
}

export const defaultValue: Readonly<IDocumentUpload> = {};
