// login form

import React from 'react'

export default function Auth() {
  // state: email, pass, location/history, newUser
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newUser, setNewUser] = useState(false);
  // handle: authSubmit, 
  // return: form (email, pass), sign in/up button

  return (
    <>
      <form onSubmit={handleAuthSubmit}
        id='auth-form'>
        <div>
          <span onClick={() => setNewUser(false)}
            className={!newUser && 'active'}>Sign In</span>
          <span onClick={() => setNewUser(true)}
            className={newUser && 'active'}>Sign Up</span>
        </div>
        <label htmlFor='email'>Email
          <input onChange={(e) => setEmail(e.target.value)}
            value={email}
            name='email'
            type='email'
            required />
        </label>
        <label htmlFor='password'>Password
          <input onChange={(e) => setPassword(e.target.value)}
            value={password}
            name='password'
            type='password'
            minLength='4'
            required />
        </label>
        <button
          id='form-button'
          type='submit'
          form='auth-form'>{
            !newUser
              ? 'Sign in'
              : 'Sign up'
          }</button>
      </form>
    </>
  )
}
