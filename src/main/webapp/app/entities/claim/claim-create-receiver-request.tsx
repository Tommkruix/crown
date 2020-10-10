import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Button, Checkbox, Col, DatePicker, Form, Input, InputNumber, Row, Select, Switch } from 'antd';
import { Translate, translate } from 'react-jhipster';
import { IRootState } from 'app/shared/reducers';
import { getEntities as getReceiverResources, getEntity as getReceiverResourceEntity } from 'app/entities/receiver-resource/receiver-resource.reducer';
import { getEntities as getReceiverSuppliers } from 'app/entities/receiver-supplier/receiver-supplier.reducer';
import {
  getEntities as getSupplierResources,
  getEntity as getSupplierResourceEntity
} from 'app/entities/supplier-resource/supplier-resource.reducer';
import { createEntity, getEntity, updateEntity } from './claim.reducer';
import { defaultValue, IClaim } from "app/shared/model/claim.model";
import ReceiverSupplierAntFields from "app/entities/receiver-supplier/receiver-supplier-fields-ant";
import { normFile } from "app/helpers/utils";
import UploadFile from "app/commonComponents/UploadFile";
import { getEntities as getResourceTypes } from "app/entities/resource-type/resource-type.reducer";
import { ArrowLeftOutlined } from '@ant-design/icons';
import App from "app/entities/receiver-resource/ant-loading-button";

import axios from 'axios';

const { Option } = Select;

export interface IClaimRequestBySupplierProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}
export interface IReceiverResourceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> { }

export const ClaimRequestByReceiver = (props: IClaimRequestBySupplierProps) => {
  const [receiverResourceId, setReceiverResourceId] = useState('0');
  const [supplierResourceId, setSupplierResourceId] = useState('0');
  const [ApproximatePriceValue] = useState('0');
  const [entity, setEntity] = useState(defaultValue);
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);
  const { claimEntity, receiverResources, receiverSuppliers, supplierResources, loading, updating, account, resourceTypes } = props;
  const [isAssistedCreation, setIsAssistedCreation] = useState(false);
  const [pofFileList, setPofFileList] = useState('');
  const [poaFileList, setPoaFileList] = useState([]);
  const [fieldNameList, setFieldNameList] = useState([]);
  const [form] = Form.useForm();

  // const beforePofUpload = file => {
  //  setPofFileList([...pofFileList, file]);
  //  return false;
  // }

  const query = new URLSearchParams(props.location.search);
  const lat = query.get('lat') || 0;
  const lng = query.get('lng') || 0;
  const initialValues: IClaim = {
    supplierResource: {
      supplier: {
        email: account.email,
        isSupplier: true,
        latx: Number(lat),
        longy: Number(lng)
      }
    }
  }


  const beforePoaUpload = file => {
    setPoaFileList([...poaFileList, file]);
    return false;
  }

  const beforeFieldNameUpload = (fieldType) => {
    setFieldNameList([...fieldNameList, fieldType]);
    return fieldNameList;
  }


  const supplierProfile = receiverSuppliers.filter(supplier => supplier.email === account.email);
  const handleClose = () => {
    props.history.push('/claim');
  };

  // const updatePofFileList = fileName => {
  //  if (!pofFileList.includes(fileName)) {
  //    setPofFileList(`${pofFileList.length > 0 ? `${pofFileList},` : ''}${fileName}`);
  //  }
  // };

  useEffect(() => {
    form.setFieldsValue({
      proofOfFunds: pofFileList
    });
  }, [pofFileList]);

  const updatePoaFileList = fileName => {
    if (!poaFileList.includes(fileName)) {
      setPofFileList(`${pofFileList.length > 0 ? `${pofFileList},` : ''}${fileName}`);
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      supplier: {
        proofOfAssociation: poaFileList
      }
    });
  }, [poaFileList]);

  useEffect(() => {
    const localReceiverId = new URLSearchParams(props.location.search).get("receiverResourceId");

    if (localReceiverId) {
      setReceiverResourceId(localReceiverId)
      setIsAssistedCreation(true)
    }

    // props.getReceiverResources();
    props.getReceiverResourceEntity(localReceiverId);
  }, []);

  useEffect(() => {
    if (!isNew) {
      props.getEntity(props.match.params.id);
    }

    props.getResourceTypes();
    props.getReceiverSuppliers();
  }, []);

  useEffect(() => {
    form.setFieldsValue({ ...props.claimEntity })
  }, [props.claimEntity]);

  useEffect(() => {
    if (props.updateSuccess) {
      // const data = new FormData()
      // data.append('file', pofFileList[0])
      // data.append('fieldType', 'pof')
      // const config = {
      //  headers: {
      //    fieldType: 'pof',
      //  }
      // }
      // axios.post('api/file/upload', data, config).then((res: any) => {
      handleClose();
      // }).catch((err: Error) => {
      // })
    }
  }, [props.updateSuccess]);

  useEffect(() => {
    setEntity({ ...entity, receiverResource: props.receiverResourceEntity })
    form.setFieldsValue({
      supplierResource: {
        resourceType: props.receiverResourceEntity.resourceType
      },
      receiverResource: props.receiverResourceEntity
    })
  }, [props.receiverResourceEntity]);

  const saveEntity = values => {
    const persistent: IClaim = {
      ...entity,
      ...values
    };
    if (supplierProfile.length !== 0) {
      persistent.supplierResource.supplier = {
        email: supplierProfile[0].email
      }
    } else {
      const supplier = {
        ...persistent.supplierResource.supplier,
        email: account.email,
        isSupplier: true,
        latx: Number(lat),
        longy: Number(lng)
      }
      persistent.supplierResource.supplier = supplier
    }

    props.createEntity(persistent);
  };

  const mayBeSupplierFields = () => {
    if (supplierProfile && supplierProfile.length > 0) {
      return null;
    }
    return (
      <React.Fragment>
        <ReceiverSupplierAntFields
          fieldPrefix={['supplierResource', 'supplier']}
          updatePoaFileList={updatePoaFileList}
        />
      </React.Fragment>
    );
  };

  // if (receiverResourceEntity.postedDate) {
  //   initialValues.postedDate = moment(receiverResourceEntity.postedDate);
  // }
  // if (receiverResourceEntity.expiration) {
  //   initialValues.expiration = moment(receiverResourceEntity.expiration);
  // }
  return (

    <div>
      <Row className="justify-content-center">
        <Col span={16}>
          <h2 id="crownApp.claim.home.createOrEditLabel">
            <Translate contentKey="crownApp.claim.home.createOrEditLabel">Create or edit a Claim</Translate>
          </h2>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col span={16}>
          {loading ? (
            <p>Loading...</p>
          ) : (
              <div>
                {entity.receiverResource ? (
                  <div style={{ paddingBottom: "20px" }}>
                    <div>Item: {entity.receiverResource?.resourceType?.name}</div>
                    <div>Requested Quantity: {entity.receiverResource?.quantity}</div>
                  </div>
                ) :
                  null}
                <Form
                  name="claim"
                  onFinish={saveEntity}
                  layout="vertical"
                  initialValues={initialValues}
                  form={form}
                >
                  {!isNew ? (
                    <Form.Item
                      name={['claim', 'id']}
                      label={translate('global.field.id')}
                      rules={[
                        {
                          required: true,
                          message: ''
                        }
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  ) : null}
                  <Form.Item
                    name={['supplierResource', 'resourceType', 'id']}
                    label={translate('crownApp.supplierResource.resourceType')}
                    rules={[
                      {
                        required: true,
                        message: 'Please select a resource type!'
                      }
                    ]}
                  >
                    <Select placeholder="Select a resource type">
                      <Option value="" key="0">
                        Select
                      </Option>
                      {resourceTypes
                        ? resourceTypes.map(otherEntity => (
                          <Option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </Option>
                        ))
                        : null}
                    </Select>
                  </Form.Item>

                  {/* <Form.Item
                    name="quantity"
                    label={translate('crownApp.supplierResource.quantity')}
                    rules={[
                      {
                        required: true,
                        message: translate('entity.validation.required')
                      }
                    ]}
                  >
                    <InputNumber min={1} style={{ width: '100%' }} />
                  </Form.Item> */}

                  <Form.Item
                    name={['supplierResource', 'quantity']}
                    label={<Translate contentKey="crownApp.supplierResource.quantity">Quantity</Translate>}
                    rules={[
                      {
                        required: true,
                        message: translate('entity.validation.required')
                      }
                    ]}
                  >
                    <InputNumber min={1} style={{ width: '100%' }} />
                  </Form.Item>

                  <Form.Item
                    name={['supplierResource', 'quantityValidUntil']}
                    label={translate('crownApp.supplierResource.quantityValidUntil')}
                    rules={[
                      {
                        required: true,
                        message: translate('entity.validation.required')
                      }
                    ]}
                  >
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>

                  <Form.Item
                    name={['supplierResource', 'cost']}
                    label={translate('crownApp.supplierResource.cost')}
                    rules={[
                      {
                        required: true,
                        message: translate('entity.validation.required')
                      }
                    ]}
                  >
                    <InputNumber style={{ width: '100%' }} />
                  </Form.Item>

                  <Form.Item
                    name={['supplierResource', 'productAvailabilityLeadTime']}
                    label={translate('crownApp.supplierResource.productAvailabilityLeadTime')}
                    rules={[
                      {
                        required: true,
                        message: translate('entity.validation.required')
                      }
                    ]}
                  >
                    <InputNumber min={1} style={{ width: '100%' }} />
                  </Form.Item>

                  <Form.Item
                    name={['supplierResource', 'minOrderQuantity']}
                    label={translate('crownApp.supplierResource.minOrderQuantity')}
                    rules={[
                      {
                        required: true,
                        message: translate('entity.validation.required')
                      }
                    ]}
                  >
                    <InputNumber min={1} style={{ width: '100%' }} />
                  </Form.Item>

                  <Form.Item
                    name={['supplierResource', 'quantityOnHand']}
                    label={translate('crownApp.supplierResource.quantityOnHand')}
                    rules={[
                      {
                        required: true,
                        message: translate('entity.validation.required')
                      }
                    ]}
                  >
                    <InputNumber min={1} style={{ width: '100%' }} />
                  </Form.Item>

                  <Form.Item
                    name={['supplierResource', 'SupportingDocuments']}
                    label={translate('crownApp.supplierResource.supportingDocuments')}
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                  >
                    <UploadFile
                      action="api/file/upload"
                      // onSuccess={updatePofFileList}
                      beforeUpload={beforePoaUpload}
                      beforeFieldUpload={() => beforeFieldNameUpload("sd")}
                      data={{
                        fieldType: 'sd'
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    name={['supplierResource', 'productAssets']}
                    label={translate('crownApp.supplierResource.productAssets')}
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                  >
                    <UploadFile
                      action="api/file/upload"
                      // onSuccess={updatePofFileList}
                      beforeUpload={beforePoaUpload}
                      beforeFieldUpload={() => beforeFieldNameUpload("pa")}
                      data={{
                        fieldType: 'pa'
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    name={['supplierResource', 'ProofOfLife']}
                    label={translate('crownApp.supplierResource.proofOfLife')}
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                  >
                    <UploadFile
                      action="api/file/upload"
                      // onSuccess={updatePofFileList}
                      beforeUpload={beforePoaUpload}
                      beforeFieldUpload={() => beforeFieldNameUpload("pol")}
                      data={{
                        fieldType: 'pol'
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    name={['supplierResource', 'publicationPermission']}
                    valuePropName="checked"
                    rules={[
                      { validator: (_, value) => value ? Promise.resolve() : Promise.reject('Please Accept the Terms and Policy') },
                    ]}
                  >
                    <Checkbox>
                      I give permission for publication of my product and have read the <Link to='/policy'>Terms and Policy</Link>
                    </Checkbox>
                  </Form.Item>
                  <Form.Item name="isSupplier" style={{ display: 'none' }}>
                    <Input hidden={true} />
                  </Form.Item>
                  {mayBeSupplierFields()}
                  <Row gutter={[0, 8]}>
                    <Col span={4}>
                      <Form.Item>
                        <a href="/claim" > <Button type="primary" icon={<ArrowLeftOutlined />}>
                          {translate('entity.action.back')}
                        </Button> </a>
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item>
                        <App />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </div>
            )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  receiverResources: storeState.receiverResource.entities,
  receiverSuppliers: storeState.receiverSupplier.entities,
  supplierResources: storeState.supplierResource.entities,
  receiverResourceEntity: storeState.receiverResource.entity,
  claimEntity: storeState.claim.entity,
  loading: storeState.claim.loading,
  updating: storeState.claim.updating,
  updateSuccess: storeState.claim.updateSuccess,
  account: storeState.authentication.account,
  resourceTypes: storeState.resourceType.entities
});

const mapDispatchToProps = {
  getReceiverResources,
  getSupplierResources,
  getEntity,
  updateEntity,
  createEntity,
  getReceiverResourceEntity,
  getResourceTypes,
  getReceiverSuppliers
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ClaimRequestByReceiver);
