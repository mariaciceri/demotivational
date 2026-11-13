import * as z from "zod";
import {useEffect, useState} from 'react'
import './App.css'

function App() {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [usedQuotesId, setUsedQuotesId] = useState<number[]>([]);
    const [quoteToDisplay, setQuoteToDisplay] = useState<Quote>();

    const QuoteSchema = z.object({
        id: z.number(),
        quote: z.string(),
        author: z.string()
    });

    const QuotesSchema = z.array(QuoteSchema);
    type Quote = z.infer<typeof QuoteSchema>;

    function getRandomQuoteId(): void {
        const usedQuotes = usedQuotesId.length >= quotes.length ? [] : usedQuotesId;

        // eslint-disable-next-line react-hooks/purity
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
            .then((data : unknown) => setQuotes(QuotesSchema.parse(data)))
            .catch((err) => {
                console.error(err.issues);
                setError("Something went wrong in our backend. We are fixing it");
            });
    }, []);

    function getQuote(id: number) {
        const quote = quotes.find((quote) => quote.id === id);
        setQuoteToDisplay(quote);
    }

    return (
        <div className="flex h-screen flex-col">
            <h1 className="font-londrina text-shadow-purple-300 text-shadow-2xs text-6xl sm:text-9xl text-center p-3 skew-2 m-4 sm:m-8 wrap-break-word">
                DEMOTIVATIONAL QUOTES
            </h1>

            {quotes.length === 0 ? (
                <p>Hold up a minute: {error}</p>
            ) : (
                <div className="text-center p-5 flex flex-1 flex-col items-center">
                    <p className="backdrop-blur-sm p-4 rounded-lg text-2xl sm:text-7xl mx-4 sm:mx-32 my-auto wrap-break-word">
                        {quoteToDisplay ?
                            quoteToDisplay.quote : "Click on the button to get something uninspirational!"}
                    </p>
                    <button
                        className="shadow-fuchsia-300 shadow-lg p-3 m-4 rounded-md bg-black/70 text-fuchsia-300 text-3xl hover:bg-black"
                        onClick={getRandomQuoteId}>
                        New quote
                    </button>
                </div>
            )}
        </div>
    )
}

export default App
