import React, { useState, useEffect } from 'react';
import Signin from './Signin/Signin';
import RegisterPage from './Signup/register';
import { AccountMenu } from 'app/shared/layout/menus';
import { Popover, Button } from 'antd';
import './Auth.scss';

const Auth = ({isAuthenticated}) => {
	const [isSignUp, setIsSignUp] = useState(false);
	const [visible, setVisible] = useState(false);

	const hide = () => {
		setVisible(false);
	};

	const handleVisibleChange = isVisible => {
		setVisible(isVisible);
	};

	useEffect(() => {
		setVisible(false);
	}, [isAuthenticated])

	const toggleSignUp = selected => setIsSignUp(selected === 'signUp');

	const content = (
		<form className="auth">
			<div className="buttons">
				<div className="button-container">
					<button type="button" onClick={() => toggleSignUp('signIn')}  className={ !isSignUp ? 'active' : '' }>Sign In</button>
				</div>
				<div className="button-container">
					<button type="button" onClick={() => toggleSignUp('signUp')} className={ isSignUp ? 'active' : '' }>Sign Up</button>
				</div>
			</div>
			{
				isSignUp ? <RegisterPage hide={hide} /> : <Signin hide={hide} /> 
			}
		</form>
	);

	return (
		<>
			{
				isAuthenticated ?	<AccountMenu isAuthenticated />
					:
						<Popover
							content={content}
							placement="bottomRight"
							trigger="click"
							visible={visible}
							onVisibleChange={handleVisibleChange}
							>
							<Button className="header-btn shadow rounded Popover1">SIGN UP</Button>	
						</Popover>				 					
			}
		</>
	);
}

export default Auth;
