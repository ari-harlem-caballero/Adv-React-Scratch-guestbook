// login form
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useUser } from "../../context/UserContext";


export default function Auth() {
  // state: email, pass, location/history, newUser
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useUser();
  const location = useLocation();
  const history = useHistory();

  // handle: authSubmit, 
  async function handleSubmit(e) {
    try {
      e.preventDefault();
      await login(email, password);

      const url = location.state.origin ? location.state.origin.pathname : '/';

      history.replace(url);

    } catch (error) {
      setError(error.message);
    }
  }

  // return: form (email, pass), sign in/up button
  return (
    <>
      <h1>Welcome to Guestbook</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>
          Email
          <input 
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder='email'
            type='email'
            required />
        </label>
        <label htmlFor='password'>
          Password
          <input 
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder='password'
            type='password'
            minLength='4'
            required />
        </label>
        <button>
          Sign In
        </button>
      </form>
    </>
  )
}
