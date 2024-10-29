import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import BooksList from "./BooksList";
import booksStore from "../../features/Books/Books.store";
import { BookDto } from "../../features/Books/Books.type";

jest.mock("../../features/Books/Books.store", () => ({
  __esModule: true,
  default: {
    booksList: [],
    isLoading: false,
    error: null,
    fetchAllBooks: jest.fn(),
  },
}));

const mockBooks: BookDto[] = [
  { author: "George Orwell", name: "1984" },
  { author: "Harper Lee", name: "To Kill a Mockingbird" },
];

describe("BooksList Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset the mock store to initial state
    booksStore.booksList = [];
    booksStore.isLoading = false;
    booksStore.error = null;
  });

  it("should call fetchAllBooks on mount", async () => {
    render(<BooksList />);
    await waitFor(() => {
      expect(booksStore.fetchAllBooks).toHaveBeenCalled();
    });
  });

  it("should display a loading indicator when loading", async () => {
    booksStore.isLoading = true;
    render(<BooksList />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("should display an error message if there is an error", async () => {
    booksStore.error = "Failed to load books.";
    render(<BooksList />);
    expect(screen.getByText("Failed to load books.")).toBeInTheDocument();
  });

  it("should display 'No books available.' if the books list is empty", async () => {
    booksStore.booksList = [];
    render(<BooksList />);
    expect(screen.getByText("No books available.")).toBeInTheDocument();
  });

  it("should display a list of books", async () => {
    booksStore.booksList = mockBooks;
    render(<BooksList />);
    expect(screen.getByText("1984")).toBeInTheDocument();
    expect(screen.getByText("To Kill a Mockingbird")).toBeInTheDocument();
  });
});
