package org.crown.service.dto;

/**
 * DTO for managing uploaded documents to AWS S3
 */

public class DocumentUpload {

    private String fieldName; // field type
    private String filename;
    private String fileDownloadUri;
    private String hashKey;

    public DocumentUpload() {
    }

    public DocumentUpload(String fieldName, String filename, String fileDownloadUri, String hashKey) {
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
