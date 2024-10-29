import React, { useEffect } from "react";
import { observer } from "mobx-react";
import booksStore from "../../features/Books/Books.store";
import { Book } from "../../features/Books/Book";
import { List, Typography, CircularProgress, Container } from "@mui/material";

const BooksList = observer((): React.ReactElement => {
  const { booksList, isLoading, error, fetchAllBooks } = booksStore;

  useEffect(() => {
    fetchAllBooks();
  }, [fetchAllBooks]);

  if (isLoading) {
    return (
      <Container sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" sx={{ mt: 4 }}>
        {error}
      </Typography>
    );
  }

  return (
    <>
      {booksList.length === 0 ? (
        <Typography variant="h6" align="center" sx={{ mt: 4 }}>
          No books available.
        </Typography>
      ) : (
        <List>
          {booksList.map((book, index) => (
            <Book key={index} author={book.author} name={book.name} />
          ))}
        </List>
      )}
    </>
  );
});

export default BooksList;
