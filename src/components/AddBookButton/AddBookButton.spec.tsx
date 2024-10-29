import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddBookButton from "./AddBookButton";
import booksStore from "../../features/Books/Books.store";
import { mockBooks } from "../../features/Books/Books.mock";
import { useLocalStorage } from "usehooks-ts";

jest.mock("usehooks-ts", () => ({
  useLocalStorage: jest.fn(),
}));

jest.mock("../../features/Books/Books.store", () => ({
  __esModule: true,
  default: {
    addBook: jest.fn(),
  },
}));

describe("AddBookButton Component", () => {
  let mockSetCounter: jest.Mock;

  beforeEach(() => {
    mockSetCounter = jest.fn();
    (useLocalStorage as jest.Mock).mockReturnValue([0, mockSetCounter]);
    jest.clearAllMocks();
  });

  it("should render the Add button", () => {
    render(<AddBookButton />);
    expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
  });

  it("should add a book", () => {
    render(<AddBookButton />);
    const addButton = screen.getByRole("button", { name: /add/i });

    fireEvent.click(addButton);

    expect(booksStore.addBook).toHaveBeenCalledWith(mockBooks[0]);
  });
});
