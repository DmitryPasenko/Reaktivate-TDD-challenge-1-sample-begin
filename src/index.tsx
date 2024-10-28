import React, { useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { observer } from "mobx-react";

import "./styles.css";
import { useBooksController } from "./Books/Books.ctrl";
import { Book } from "./Books/Book";

const demoBooks = [
  { author: "George Orwell", name: "1984" },
  { author: "Harper Lee", name: "To Kill a Mockingbird" },
  { author: "J.R.R. Tolkien", name: "The Lord of the Rings" },
  { author: "F. Scott Fitzgerald", name: "The Great Gatsby" },
  { author: "Jane Austen", name: "Pride and Prejudice" },
  { author: "J.K. Rowling", name: "Harry Potter and the Philosopher's Stone" },
  { author: "Mary Shelley", name: "Frankenstein" },
  { author: "Mark Twain", name: "The Adventures of Huckleberry Finn" },
  { author: "Herman Melville", name: "Moby Dick" },
  { author: "Leo Tolstoy", name: "War and Peace" },
];

const App = observer((): React.ReactElement => {
  const { booksList, addBook } = useBooksController();
  const [counter, setCounter] = useState<number>(() => {
    const savedCounter = localStorage.getItem("bookCounter");
    return savedCounter ? parseInt(savedCounter, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem("bookCounter", counter.toString());
  }, [counter]);

  const handleAddBook = useCallback(() => {
    if (counter < demoBooks.length) {
      addBook(demoBooks[counter]);
      setCounter((prevCounter) => prevCounter + 1);
    } else {
      setCounter(0);
    }
  }, [addBook, counter]);
  return (
    <div>
      {booksList.map((book, i) => (
        <Book key={i} author={book.author} name={book.name} />
      ))}
      <button onClick={handleAddBook}>Add</button>
    </div>
  );
});

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);
