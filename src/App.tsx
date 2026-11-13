import {useEffect, useState} from 'react'
import './App.css'

function App() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [usedQuotesId, setUsedQuotesId] = useState<number[]>([]);

  type Quote = {
    id: number;
    quote: string;
    author: string;
  }



  useEffect(() => {
    fetch("/quotes.json")
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        })
        .then((data: Quote[]) => setQuotes(data))
        .catch(() => setError("Something went wrong in our backend. We are fixing it"));
  }, []);

  return (
      <>
      <h1>BEGIN</h1>

      {quotes.length === 0 ? (
          <p>{error}</p>
      ) : (
          <p>{quotes.length}</p>
      )}
      </>
  )
}

export default App
