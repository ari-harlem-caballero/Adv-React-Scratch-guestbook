// fetches entries (services), maps to list
import { useEffect, useState } from 'react';
import { getEntries } from '../../services/entries';
import { useUser } from '../../context/UserContext';

export default function EntryList() {
  // state: entries, loading
  const { logout } = useUser();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntries = async () => {
      const results = await getEntries();

      setEntries(results);
      setLoading(false);
    }

    fetchEntries();
  }, []);
  // return: logout button, loading, map entires
  return (
    <>
      <h1>Guestbook:</h1>
      <button onClick={logout}>Logout</button>
      {loading ? (
        <p>Page Loading</p>
      ) : (
        <ul>
          {entries.map((entry) => (
            <li key={entry.id}>{entry.content}</li>
          ))}
        </ul>
      )}
    </>
  )
}
