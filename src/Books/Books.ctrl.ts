import { useCallback, useEffect } from "react";
import { runInAction } from "mobx";
import { BooksModel } from "./Books.model";
import { BookDto, UseBooksController } from "./Books.type";

const booksModel = new BooksModel();

export function useBooksController(): UseBooksController {
  useEffect(() => {
    async function loadBooks(): Promise<void> {
      try {
        const books = await booksModel.fetchBooks();
        runInAction(() => {
          booksModel.setBooksList(books);
        });
      } catch (error) {
        console.error("Failed to load books", error);
      }
    }
    loadBooks();
  }, []);

  const addBook = useCallback(async (book: BookDto): Promise<void> => {
    try {
      const success = await booksModel.addBook(book);
      if (success) {
        booksModel.setBooksList([...booksModel.booksList, book]);
      }
    } catch (error) {
      console.error("Failed to add book", error);
    }
  }, []);

  return {
    booksList: booksModel.booksList,
    addBook,
  };
}
