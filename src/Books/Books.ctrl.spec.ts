import { useBooksController } from "./Books.ctrl";
import { renderHook, act } from "@testing-library/react-hooks";
import { waitFor } from "@testing-library/react";
import { BookDto } from "./Books.type";
import { mockBooks } from "./Books.mock";

jest.mock("./Books.model", () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { observable, action, runInAction } = require("mobx");
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { mockBooks } = require("./Books.mock");
  const reactiveBooks = observable.array(mockBooks);

  return {
    BooksModel: jest.fn().mockImplementation(() => {
      return {
        fetchBooks: action(() => {
          runInAction(() => {
            reactiveBooks.replace(mockBooks);
          });
          return Promise.resolve([...reactiveBooks]);
        }),
        addBook: action((book: BookDto) => {
          runInAction(() => {
            reactiveBooks.push(book);
          });
          return Promise.resolve(true);
        }),
        setBooksList: action((books: BookDto[]) => {
          runInAction(() => {
            reactiveBooks.replace(books);
          });
        }),
        get booksList() {
          return reactiveBooks;
        },
      };
    }),
  };
});

describe("useBooksController", () => {
  it("should load books on initialization", async () => {
    const { result } = renderHook(() => useBooksController());

    await waitFor(() => {
      expect(result.current.booksList.length).toBeGreaterThan(0);
    });

    expect(result.current.booksList.slice()).toEqual(mockBooks);
  });

  it("should add a book", async () => {
    const { result } = renderHook(() => useBooksController());

    const newBook: BookDto = { author: "New Author", name: "New Book" };

    await act(async () => {
      await result.current.addBook(newBook);
    });

    await waitFor(() => {
      expect(result.current.booksList).toContainEqual(newBook);
    });
  });
});
