package org.crown.domain;

import org.crown.service.dto.DocumentUpload;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexType;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;

/**
 * A SupplierResource.
 */
@Document(collection="supplier_resource")
public class SupplierResource implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	private String id;

	@DBRef
	@Field("resource")
	private ResourceType resourceType;

	@NotNull
	private Integer quantity;

	@NotNull
	private Date quantityValidUntil;

	@NotNull
	private Double cost;

	@NotNull
	private Integer productAvailabilityLeadTime;

	@NotNull
	private Integer minOrderQuantity;

	@NotNull
	private Integer quantityOnHand;

	@Field("identification")
	private DocumentUpload supportingDocuments;

	@Field("productPictures")
	private DocumentUpload productAssets;

	private DocumentUpload proofOfLife;

	private Boolean publicationPermission;

	@DBRef
	@JsonIgnoreProperties("supplierResources")
	private ReceiverSupplier supplier;

	@GeoSpatialIndexed(type=GeoSpatialIndexType.GEO_2DSPHERE)
	private double[] position;

	private Date postedDate;

	// jhipster-needle-entity-add-field - JHipster will add fields here, do not
	// remove
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	/**
	 * @return the quantityValidUntil
	 */
	public Date getQuantityValidUntil() {
		return quantityValidUntil;
	}

	/**
	 * @param quantityValidUntil the quantityValidUntil to set
	 */
	public void setQuantityValidUntil(Date quantityValidUntil) {
		this.quantityValidUntil = quantityValidUntil;
	}

	/**
	 * @return the productAvailabilityLeadTime
	 */
	public Integer getProductAvailabilityLeadTime() {
		return productAvailabilityLeadTime;
	}

	/**
	 * @param productAvailabilityLeadTime the productAvailabilityLeadTime to set
	 */
	public void setProductAvailabilityLeadTime(Integer productAvailabilityLeadTime) {
		this.productAvailabilityLeadTime = productAvailabilityLeadTime;
	}

	/**
	 * @return the minOrderQuantity
	 */
	public Integer getMinOrderQuantity() {
		return minOrderQuantity;
	}

	/**
	 * @param minOrderQuantity the minOrderQuantity to set
	 */
	public void setMinOrderQuantity(Integer minOrderQuantity) {
		this.minOrderQuantity = minOrderQuantity;
	}

	/**
	 * @return the quantityOnHand
	 */
	public Integer getQuantityOnHand() {
		return quantityOnHand;
	}

	/**
	 * @param quantityOnHand the quantityOnHand to set
	 */
	public void setQuantityOnHand(Integer quantityOnHand) {
		this.quantityOnHand = quantityOnHand;
	}

	/**
	 * @return the supportingDocuments
	 */
	public DocumentUpload getSupportingDocuments() {
		return supportingDocuments;
	}

	/**
	 * @param supportingDocuments the supportingDocuments to set
	 */
	public void setSupportingDocuments(DocumentUpload supportingDocuments) {
		this.supportingDocuments = supportingDocuments;
	}

	/**
	 * @return the productAssets
	 */
	public DocumentUpload getProductAssets() {
		return productAssets;
	}

	/**
	 * @param productAssets the productAssets to set
	 */
	public void setProductAssets(DocumentUpload productAssets) {
		this.productAssets = productAssets;
	}

	/**
	 * @return the proofOfLife
	 */
	public DocumentUpload getProofOfLife() {
		return proofOfLife;
	}

	/**
	 * @param proofOfLife the proofOfLife to set
	 */
	public void setProofOfLife(DocumentUpload proofOfLife) {
		this.proofOfLife = proofOfLife;
	}

	/**
	 * @return the publicationPermission
	 */
	public Boolean getPublicationPermission() {
		return publicationPermission;
	}

	/**
	 * @param publicationPermission the publicationPermission to set
	 */
	public void setPublicationPermission(Boolean publicationPermission) {
		this.publicationPermission = publicationPermission;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public Double getCost() {
		return cost;
	}

	public void setCost(Double cost) {
		this.cost = cost;
	}

	public ResourceType getResourceType() {
		return resourceType;
	}

	public SupplierResource resourceType(ResourceType resourceType) {
		this.resourceType = resourceType;
		return this;
	}

	public void setResourceType(ResourceType resourceType) {
		this.resourceType = resourceType;
	}

	public ReceiverSupplier getSupplier() {
		return supplier;
	}

	public SupplierResource supplier(ReceiverSupplier receiverSupplier) {
		this.supplier = receiverSupplier;
		return this;
	}

	public void setSupplier(ReceiverSupplier receiverSupplier) {
		this.supplier = receiverSupplier;
	}
	// jhipster-needle-entity-add-getters-setters - JHipster will add getters and
	// setters here, do not remove

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (!(o instanceof SupplierResource)) {
			return false;
		}
		return id != null && id.equals(((SupplierResource) o).id);
	}

	@Override
	public int hashCode() {
		return 31;
	}

	@Override
	public String toString() {
		return "SupplierResource{" + "id=" + getId() + ", quantity=" + getQuantity() + ", cost=" + getCost() + "}";
	}

	public void setPosition(double[] position) {
		this.position = position;
	}

	public double[] getPosition() {
		return this.position;
	}

	public Date getPostedDate() {
		return postedDate;
	}

	public void setPostedDate(Date postedDate) {
		this.postedDate = postedDate;
	}

	/*
	TODO: During Refactoring, implement builder classes for this
	      @pavlos
	 */
    public SupplierResource quantity(Integer quantity) {
        this.quantity = quantity;
        return this;
    }

    public SupplierResource cost(Double cost) {
        this.cost = cost;
        return this;
    }

    public  SupplierResource quantityValidUntil(Date quantityValidUntil) {
        this.quantityValidUntil = quantityValidUntil;
        return this;
    }

    public  SupplierResource productAvailabilityLeadTime(Integer productAvailabilityLeadTime) {
        this.productAvailabilityLeadTime = productAvailabilityLeadTime;
        return this;
    }

    public SupplierResource minOrderQuantity(Integer minOrderQuantity) {
        this.minOrderQuantity = minOrderQuantity;
        return this;
    }

    public SupplierResource quantityOnHand(Integer quantityOnHand) {
        this.quantityOnHand = quantityOnHand;
        return this;
    }
}
