import { Moment } from 'moment';
import { IResourceType } from 'app/shared/model/resource-type.model';
import { IReceiverSupplier } from 'app/shared/model/receiver-supplier.model';
import { IDocumentUpload } from 'app/shared/model/document-upload.model';

export interface ISupplierResource {
  id?: string;
  quantity?: number;
  quantityValidUntil?: Moment;
  cost?: number;
  productAvailabilityLeadTime?: number;
  minOrderQuantity?: number;
  quantityOnHand?: number;
  resourceType?: IResourceType;
  supplier?: IReceiverSupplier;
}

export const defaultValue: Readonly<ISupplierResource> = {};
