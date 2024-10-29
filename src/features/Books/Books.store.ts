import { makeAutoObservable, flow } from "mobx";
import { BookDto } from "./Books.type";
import booksRepository from "./Books.repository";

class BooksStore {
  booksList: BookDto[] = [];
  privateBooks: BookDto[] = [];
  isLoading: boolean = false;
  error: string | null = null;
  showPrivate: boolean = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setShowPrivate(value: boolean): void {
    this.showPrivate = value;
    this.fetchBooks();
  }

  fetchBooks = flow(function* (this: BooksStore) {
    this.setLoading(true);
    this.setError(null);
    try {
      const books = this.showPrivate
        ? yield booksRepository.getPrivateBooks()
        : yield booksRepository.getBooks();
      this.setBooksList(books);
    } catch (error) {
      this.setError("Failed to load books.");
    } finally {
      this.setLoading(false);
    }
  });

  fetchAllBooks = flow(function* (this: BooksStore) {
    this.setLoading(true);
    this.setError(null);
    try {
      const books = yield booksRepository.getBooks();
      this.setBooksList(books);
    } catch (error) {
      this.setError("Failed to load books.");
    } finally {
      this.setLoading(false);
    }
  });

  addBook = flow(function* (this: BooksStore, book: BookDto) {
    this.setLoading(true);
    this.setError(null);
    try {
      const success = yield booksRepository.addBook(book);
      if (success) {
        this.setBooksList([...this.booksList, book]);
      }
    } catch (error) {
      this.setError("Failed to add book.");
    } finally {
      this.setLoading(false);
    }
  });

  private setLoading = (value: boolean): void => {
    this.isLoading = value;
  };

  private setError = (message: string | null): void => {
    this.error = message;
  };

  private setBooksList = (books: BookDto[]): void => {
    this.booksList = books;
  };
}

const booksStore = new BooksStore();
export default booksStore;
