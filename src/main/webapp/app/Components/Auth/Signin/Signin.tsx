import React from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps, useHistory  } from 'react-router-dom';
import { IRootState } from 'app/shared/reducers';
import { login } from 'app/shared/reducers/authentication';
import SignInModal from './Signin-modal';

export interface ILoginProps extends StateProps, DispatchProps {toggle: Function}

export const Signin = (props: ILoginProps) => {
  const history = useHistory();

  const handleLogin = (username, password, rememberMe = false) => {
	props.login(username, password, rememberMe, history);
  }

  const handleClose = () => {
    history.push('/');
  };

  if (props.isAuthenticated) {
    return <Redirect to={'/'} />;
  }
  return <SignInModal handleLogin={handleLogin} handleClose={handleClose} loginError={props.loginError} />;
};

const mapStateToProps = ({ authentication }: IRootState) => ({
  isAuthenticated: authentication.isAuthenticated,
  loginError: authentication.loginError,
  showModal: authentication.showModalLogin,
});

const mapDispatchToProps = { login };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
