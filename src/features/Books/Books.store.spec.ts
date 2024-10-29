import { act } from "@testing-library/react-hooks";
import { waitFor } from "@testing-library/react";
import { BookDto } from "./Books.type";
import booksRepository from "./Books.repository";
import booksStore from "./Books.store";
import { mockBooks } from "./Books.mock";

jest.mock("./Books.repository", () => ({
  getBooks: jest.fn(),
  addBook: jest.fn(),
  getPrivateBooks: jest.fn(),
}));

const mockedBooksRepository = booksRepository as jest.Mocked<typeof booksRepository>;

describe("BooksStore", () => {
  beforeEach(() => {
    booksStore.booksList = [];
    booksStore.privateBooks = [];
    booksStore.error = null;
  });

  it("should load books", async () => {
    mockedBooksRepository.getBooks.mockResolvedValueOnce(mockBooks);

    await act(async () => {
      await booksStore.fetchAllBooks();
    });

    await waitFor(() => {
      expect(booksStore.booksList.length).toBeGreaterThan(0);
    });

    expect(booksStore.booksList).toEqual(mockBooks);
  });

  it("should add a book", async () => {
    const newBook: BookDto = { author: "New Author", name: "New Book" };
    mockedBooksRepository.addBook.mockResolvedValueOnce(true);

    await act(async () => {
      await booksStore.addBook(newBook);
    });

    await waitFor(() => {
      expect(booksStore.booksList).toContainEqual(newBook);
    });
  });
});
