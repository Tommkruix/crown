import React, { useState, useRef, useEffect } from 'react';
import { Button, Popover } from 'reactstrap';
import Signin from './Signin/Signin';
import RegisterPage from './Signup/register';
import { AccountMenu } from 'app/shared/layout/menus';
import './Auth.scss';

const Auth = ({isAuthenticated}) => {
	const [popoverOpen, setPopoverOpen] = useState(false);
	const [isSignUp, setIsSignUp] = useState(false);

	useEffect(() => {
		setPopoverOpen(false);
	}, [isAuthenticated])

	const toggle = () => {
		setPopoverOpen(!popoverOpen);
	}

	const toggleSignUp = selected => setIsSignUp(selected === 'signUp');

	return (
		<>
			{
				isAuthenticated ?	<AccountMenu isAuthenticated />
				:
				<>
					<Button id='Popover1' className='header-btn shadow rounded Popover1'>SIGN UPPP</Button>					 
					<Popover placement="bottom-end" isOpen={popoverOpen} target="Popover1" toggle={toggle} trigger="hover">
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
								isSignUp ? <RegisterPage toggle={toggle} /> : <Signin toggle={toggle} /> 
							}
						</form>
					</Popover>
				</>
			}
		</>
	);
}

export default Auth;
