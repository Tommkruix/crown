package org.crown.service.dto;

public class FileUploadResponse {

    private String fieldName;
    private String filename;
    private String fileDownloadUri;
    private String hashKey;

    public FileUploadResponse() {
    }

    public FileUploadResponse(String fieldName, String filename, String fileDownloadUri, String hashKey) {
        this.fieldName = fieldName;
        this.filename = filename;
        this.fileDownloadUri = fileDownloadUri;
        this.hashKey = hashKey;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public String getFileDownloadUri() {
        return fileDownloadUri;
    }

    public void setFileDownloadUri(String fileDownloadUri) {
        this.fileDownloadUri = fileDownloadUri;
    }

    public String getHashKey() {
        return hashKey;
    }

    public void setHashKey(String hashKey) {
        this.hashKey = hashKey;
    }

    public String getFieldName() {
        return fieldName;
    }

    public void setFieldName(String fieldName) {
        this.fieldName = fieldName;
    }
}
