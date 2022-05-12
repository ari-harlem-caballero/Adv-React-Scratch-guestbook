// fetches entries (services), maps to list
import { useEffect, useState } from 'react';
import { createEntry, getEntries } from '../../services/entries';
import { useUser } from '../../context/UserContext';
import './Entry.css'

export default function EntryList() {
  // state: entries, loading
  const { user } = useUser();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [entryContent, setEntryContent] = useState('');

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const results = await getEntries();
  
        setEntries(results);
        setLoading(false);

      } catch(error) {
        console.log(error);
      }
    }

    fetchEntries();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
  
      await createEntry({ userId: user.id, content: entryContent });
  
      const results = await getEntries();
  
      setEntries(results);
      setLoading(false);

    } catch(error) {
      console.log(error);
    }
  }
  // return: logout button, loading, map entires
  return (
    <>
      {loading ? (
        <p>Page Loading</p>
      ) : (
        <>
        <form onSubmit={handleSubmit}>
          <textarea 
            value={entryContent}
            onChange={(e) => setEntryContent(e.target.value)}
            placeholder='add new entry'
            required
          />
          <button type='submit'>Add to guestbook</button>
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
