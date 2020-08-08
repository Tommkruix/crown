import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './claim.reducer';
import { IClaim } from 'app/shared/model/claim.model';
import {APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT, AUTHORITIES} from 'app/config/constants';
import {hasAnyAuthority} from "app/shared/auth/private-route";

export interface IClaimProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Claim = (props: IClaimProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { claimList, match, loading } = props;
  return (
    <div>
      <h2 id="claim-heading">
        <Translate contentKey="crownApp.claim.home.title">My Open Orders</Translate>
        {/* <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="crownApp.claim.home.createLabel">Create new Claim</Translate>
        </Link> */}
      </h2>
      <div className="table-responsive">
        {claimList && claimList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="crownApp.claim.quantity">Quantity</Translate>
                </th>
                <th>
                  <Translate contentKey="crownApp.claim.notes">Notes</Translate>
                </th>
                <th>
                  <Translate contentKey="crownApp.claim.status">Status</Translate>
                </th>
                <th>
                  <Translate contentKey="crownApp.claim.currentStock">current Stock</Translate>
                </th>
                <th>
                  <Translate contentKey="crownApp.claim.expiration">Expiration</Translate>
                </th>
                <th>
                  <Translate contentKey="crownApp.claim.productInspection">production Inspection</Translate>
                </th>
                <th>
                  <Translate contentKey="crownApp.claim.productInspectDays">InspectDays</Translate>
                </th>
                <th>
                  <Translate contentKey="crownApp.claim.fundsAvailable">funds available</Translate>
                </th>
                <th>
                  <Translate contentKey="crownApp.claim.acceptUnpackagedGoods">Unpackaged</Translate>
                </th>
                <th>
                  <Translate contentKey="crownApp.claim.fundRestrictions">fundRestrictions</Translate>
                </th>
                <th>
                  <Translate contentKey="crownApp.claim.proofOfFunds">Proof Of Funds</Translate>
                </th>
                {
                  props.isAdmin &&
                  <th>
                    <Translate contentKey="crownApp.claim.receiverResource">Receiver Resource</Translate>
                  </th>
                }
                {
                  props.isAdmin &&
                  <th>
                    <Translate contentKey="crownApp.claim.supplierResource">Supplier Resource</Translate>
                  </th>
                }
                <th />
              </tr>
            </thead>
            <tbody>
              {claimList.map((claim, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${claim.id}`} color="link" size="sm">
                      {claim.id}
                    </Button>
                  </td>
                  <td>{claim.receiverResource.quantity}</td>
                  <td>{claim.receiverResource.notes}</td>
                  <td>
                    <Translate contentKey={`crownApp.ClaimStatusEnum.${claim.status}`} />
                  </td>
                  <td>{claim.receiverResource.currentStock}</td>
                  <td>
                    <TextFormat type="date" value={claim.receiverResource.expiration} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{claim.receiverResource.productInspection ? 'true' : 'false'}</td>
                  <td>{claim.receiverResource.productInspectDays}</td>
                  <td>{claim.receiverResource.fundsAvailable ? 'true' : 'false'}</td>
                  <td>{claim.receiverResource.acceptUnpackagedGoods ? 'true' : 'false'}</td>
                  <td>{claim.receiverResource.fundRestrictions}</td>
                  <td>{claim.receiverResource.proofOfFunds}</td>
                  {
                    props.isAdmin &&
                    <td>
                      {claim.receiverResource ? (
                        <Link to={`receiver-resource/${claim.receiverResource.id}`}>{claim.receiverResource.id}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                  }
                  {
                    props.isAdmin &&
                    <td>
                      {claim.supplierResource ? (
                        <Link to={`supplier-resource/${claim.supplierResource.id}`}>{claim.supplierResource.id}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                  }
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${claim.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      {/* <Button tag={Link} to={`${match.url}/${claim.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button> */}
                      <Button tag={Link} to={`${match.url}/${claim.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="crownApp.claim.home.notFound">No Claims found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ authentication, claim }: IRootState) => ({
  claimList: claim.entities,
  loading: claim.loading,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN])
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Claim);
