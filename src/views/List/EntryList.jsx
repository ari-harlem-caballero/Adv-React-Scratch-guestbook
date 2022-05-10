// fetches entries (services), maps to list
import { useEffect, useState } from 'react';
import { getEntries } from '../../services/entries';
import { useUser } from '../../context/UserContext';

export default function EntryList() {
  // state: entries, loading
  const { logout, user } = useUser();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [entryContent, setEntryContent] = useState('');

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
      <p>{`Welcome back ${user.email}`}</p>
      <button onClick={logout}>Logout</button>
      {loading ? (
        <p>Page Loading</p>
      ) : (
        <>
        <form>
          <textarea 
            value={entryContent}
            onChange={(e) => setEntryContent(e.target.value)}
            required
          />
          <button>Add to guestbook</button>
        </form>
        <h3>Past entries:</h3>
        <ul>
          {entries.map((entry) => (
            <li key={entry.id}>{entry.content}</li>
          ))}
        </ul>
        </>
      )}
    </>
  )
}
