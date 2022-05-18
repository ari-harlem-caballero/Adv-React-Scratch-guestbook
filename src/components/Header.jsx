import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function Header() {
  const { logout, user } = useUser();

  return (
    <header>
      {
        user?.email ? (
          <>
            <h1>Guestbook:</h1>
            <p>{`Welcome back ${user.email}`}</p>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to='/login'>
            Sign In
          </Link>
        )
      }
    </header>
  )
}
