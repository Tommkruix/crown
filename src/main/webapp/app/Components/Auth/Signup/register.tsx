import React, { useState, useEffect } from 'react';
import { Translate, translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { AvForm, AvField, AvCheckboxGroup, AvCheckbox} from 'availity-reactstrap-validation';
import { Row, Col, Alert, Button } from 'reactstrap';

import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { IRootState } from 'app/shared/reducers';
import { handleRegister, reset } from './register.reducer';
import { useHistory, Link } from "react-router-dom";

export interface IRegisterProps extends StateProps, DispatchProps {toggle: Function}

export const RegisterPage = (props: IRegisterProps) => {
  const [password, setPassword] = useState('');
  const history = useHistory();

  useEffect(() => () => props.reset(), []);

  const handleValidSubmit = (event, values) => {
    props.handleRegister(values.username, values.email, values.firstPassword, props.currentLocale);
	event.preventDefault();
	props.toggle();
    history.push("/login");
  };

  const updatePassword = event => setPassword(event.target.value);

  return (
    <>
          <AvForm id="register-form" onValidSubmit={handleValidSubmit}>
            <AvField
              name="username"
              placeholder={translate('global.form.username.placeholder')}
              validate={{
                required: { value: true, errorMessage: translate('register.messages.validate.login.required') },
                pattern: { value: '^[_.@A-Za-z0-9-]*$', errorMessage: translate('register.messages.validate.login.pattern') },
                minLength: { value: 1, errorMessage: translate('register.messages.validate.login.minlength') },
                maxLength: { value: 50, errorMessage: translate('register.messages.validate.login.maxlength') }
              }}
            />
            <AvField
              name="email"
              placeholder={translate('global.form.email.placeholder')}
              type="email"
              validate={{
                required: { value: true, errorMessage: translate('global.messages.validate.email.required') },
                minLength: { value: 5, errorMessage: translate('global.messages.validate.email.minlength') },
                maxLength: { value: 254, errorMessage: translate('global.messages.validate.email.maxlength') }
              }}
            />
            <AvField
              name="firstPassword"
              placeholder={translate('global.form.newpassword.placeholder')}
              type="password"
              onChange={updatePassword}
              validate={{
                required: { value: true, errorMessage: translate('global.messages.validate.newpassword.required') },
                minLength: { value: 4, errorMessage: translate('global.messages.validate.newpassword.minlength') },
                maxLength: { value: 50, errorMessage: translate('global.messages.validate.newpassword.maxlength') }
              }}
            />
            <PasswordStrengthBar password={password} />
            <AvField
              name="secondPassword"
              placeholder={translate('global.form.confirmpassword.placeholder')}
              type="password"
              validate={{
                required: { value: true, errorMessage: translate('global.messages.validate.confirmpassword.required') },
                minLength: { value: 4, errorMessage: translate('global.messages.validate.confirmpassword.minlength') },
                maxLength: { value: 50, errorMessage: translate('global.messages.validate.confirmpassword.maxlength') },
                match: { value: 'firstPassword', errorMessage: translate('global.messages.error.dontmatch') }
              }}
            />

            <AvCheckboxGroup
				className='signup-checkbox'
              validate={{ required: { value: true, errorMessage: 'This Field is Required!' } }}
              name="terms-and-policy">

              <div className='agreement'>
                <AvCheckbox				
                  label='I have read and agree to the '
                  validate={{ required: {value: true, errorMessage: 'Required'}}}
                />
                <Link to={`/policy`} className="link">Terms and Policy</Link>
              </div>
            </AvCheckboxGroup>


            <Button id="register-submit" color="primary" type="submit" className='login-btn'>
              <Translate contentKey="register.form.button">Sign Up</Translate>
            </Button>
          </AvForm>
    </>
  );
};

const mapStateToProps = ({ locale }: IRootState) => ({
  currentLocale: locale.currentLocale
});

const mapDispatchToProps = { handleRegister, reset };
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
