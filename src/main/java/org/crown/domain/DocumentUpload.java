package org.crown.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.validation.constraints.NotBlank;
import java.io.Serializable;

/**
 * A Document Upload Resource.
 */
@Document(collection = "document_upload")
public class DocumentUpload implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotBlank
    @Field("fileName")
    private String fileName;

    @NotBlank
    @Field("fileDownloadUri")
    private String fileDownloadUri;

    @NotBlank
    @Field("hashKey")
    private String hashKey;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
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
}
