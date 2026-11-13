import {useEffect, useState} from 'react'
import './App.css'

function App() {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [usedQuotesId, setUsedQuotesId] = useState<number[]>([]);
    const [quoteToDisplay, setQuoteToDisplay] = useState<Quote>();

    type Quote = {
        id: number;
        quote: string;
        author: string;
    }

    function getRandomQuoteId(): void {
        const usedQuotes = usedQuotesId.length >= quotes.length ? [] : usedQuotesId;

        const quoteNumber: number = Math.floor(quotes.length * Math.random() + 1);

        if (usedQuotes.includes(quoteNumber)) {
            getRandomQuoteId();
        } else {
            setUsedQuotesId([...usedQuotes, quoteNumber]);
            getQuote(quoteNumber);
        }
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

            <button onClick={getRandomQuoteId}>QUICK ME</button>
            <p>{quoteToDisplay}</p>


        </>
    )
}

export default App
