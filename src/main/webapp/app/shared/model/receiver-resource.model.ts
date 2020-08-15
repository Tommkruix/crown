import { Moment } from 'moment';
import { IResourceType } from 'app/shared/model/resource-type.model';
import { IReceiverSupplier } from 'app/shared/model/receiver-supplier.model';
import { IDocumentUpload } from 'app/shared/model/document-upload.model';

export interface IReceiverResource {
  id?: string;
  name?: string;
  quantity?: number;
  dailyUse?: number;
  postedDate?: Moment;
  currentStock?: number;
  expiration?: Moment;
  notes?: string;
  proofOfFunds?: IDocumentUpload;
  productInspection?: boolean;
  productInspectDays?: number;
  fundsAvailable?: boolean;
  acceptUnpackagedGoods?: boolean;
  fundRestrictions?: string;
  resourceType?: IResourceType;
  receiver?: IReceiverSupplier;
}

export const defaultValue: Readonly<IReceiverResource> = {};
