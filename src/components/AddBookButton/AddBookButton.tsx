import React from "react";
import { Button } from "@mui/material";
import { useLocalStorage } from "usehooks-ts";
import { mockBooks } from "../../features/Books/Books.mock";
import booksStore from "../../features/Books/Books.store";

const AddBookButton = (): React.ReactElement => {
  const [counter, setCounter] = useLocalStorage<number>("bookCounter", 0);

  const handleAddBook = (): void => {
    if (counter < mockBooks.length) {
      booksStore.addBook(mockBooks[counter]);
      setCounter((prevCounter) => prevCounter + 1);
    } else {
      setCounter(0);
    }
  };

  return (
    <Button variant="contained" color="primary" onClick={handleAddBook} sx={{ mt: 2 }}>
      Add
    </Button>
  );
};

export default AddBookButton;
