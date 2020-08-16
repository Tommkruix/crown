import React from 'react';
import { Translate, translate } from 'react-jhipster';
import { Button, Alert, Row, Col } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Link } from 'react-router-dom';

export interface ILoginModalProps {
  handleClose: Function;
  handleLogin: Function;
  loginError: boolean;
  hide: Function;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const SignInModal = (props) => {
	const handleSubmit = (event, errors, { username, password, rememberMe }) => {
		const { handleLogin } = props;
		handleLogin(username, password, rememberMe);
	};

    return (
		<div>
			<AvForm onSubmit={handleSubmit}>
				<Row>
				<Col md="12">
					{props.loginError ? (
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
				<Link to="/account/reset/request">
					<Button type="submit" color="link" onClick={props.hide}>Forgot Password?</Button>
				</Link>
			</AvForm>
		</div>
	);
}

export default SignInModal;
