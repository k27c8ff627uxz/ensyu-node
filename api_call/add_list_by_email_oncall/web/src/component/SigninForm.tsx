import React, { useState } from 'react';
import { Auth } from 'firebase/auth';

interface SignInFormProp {
  auth: Auth,
  onSubmit: (data: {email: string, password: string}, auth: Auth) => void;
}

export const SignInForm: React.FC<SignInFormProp> = (props) => {
  const [email, changeEmail] = useState('');
  const [password, changePassword] = useState('');

  return (
    <form>
      <div>
        <label>Enter your email: </label>
        <input
          type="text"
          onChange={(event) => changeEmail(event.target.value)}
          required
        />
      </div>
      <div>
        <label>Password: </label>
        <input
          type="password"
          onChange={(event) => changePassword(event.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="button"
          value="Subscribe!"
          onClick={() => props.onSubmit({email, password}, props.auth)} />
      </div>
    </form>
  );
}
