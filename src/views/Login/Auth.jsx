// login form
import { signInUser, signUpUser } from "../../services/user";
import { useState } from "react";


export default function Auth() {
  // state: email, pass, location/history, newUser
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // handle: authSubmit, 
  async function handleSubmit(e) {
    try {
      e.preventDefault();

    } catch (error) {
      setError(error.message);
    }
  }

  // return: form (email, pass), sign in/up button
  return (
    <>
      <h1>Welcome to Guestbook</h1>
      <form>
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
        <button onClick={handleSubmit}>
          Sign In
        </button>
      </form>
    </>
  )
}
