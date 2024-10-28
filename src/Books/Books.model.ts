import { makeAutoObservable } from "mobx";
import { BookDto } from "./Books.type";
import booksRepository from "./Books.repository";

export class BooksModel {
  booksList: BookDto[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async fetchBooks(): Promise<BookDto[]> {
    return await booksRepository.getBooks();
  }

  async addBook(book: BookDto): Promise<boolean> {
    return await booksRepository.addBook(book);
  }

  setBooksList(books: BookDto[]): void {
    this.booksList = books;
  }
}
