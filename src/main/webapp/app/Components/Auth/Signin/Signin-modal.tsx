import React from 'react';
import { Translate, translate } from 'react-jhipster';
import { Button, Alert, Row, Col } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput } from 'availity-reactstrap-validation';

export interface ILoginModalProps {
  loginError: boolean;
  handleLogin: Function;
  handleClose: Function;
}

class SignInModal extends React.Component<ILoginModalProps> {
  handleSubmit = (event, errors, { username, password, rememberMe }) => {
    const { handleLogin } = this.props;
	handleLogin(username, password, rememberMe);
  };

  render() {
	const { loginError } = this.props;

    return (
      <div>
        <AvForm onSubmit={this.handleSubmit}>
            <Row>
              <Col md="12">
                {loginError ? (
                  <Alert color="danger">
                    <Translate contentKey="login.messages.error.authentication">
                      <strong>Failed to sign in!</strong> Please check your credentials and try again.
                    </Translate>
                  </Alert>
                ) : null
				}
              </Col>
              <Col md="12">
                <AvField
                  name="username"
                  placeholder={translate('global.form.emailorusername.placeholder')}
                  required
                  errorMessage="Username cannot be empty!"
                />
                <AvField
                  name="password"
                  type="password"
                  placeholder={translate('login.form.password.placeholder')}
                  required
                  errorMessage="Password cannot be empty!"
                />
                <AvGroup check inline>
                    <AvInput type="checkbox" name="rememberMe" /> <Translate contentKey="login.form.rememberme">Remember me</Translate>
                </AvGroup>
              </Col>
            </Row>
            <div className="mt-1">&nbsp;</div>
            <Button color="primary" type="submit" className='login-btn'>
              <Translate contentKey="login.form.button">Sign In</Translate>
            </Button>
        </AvForm>
      </div>
    );
  }
}

export default SignInModal;
