import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import booksStore from "../../features/Books/Books.store";
import Header from "./Header";

jest.mock("../ShowPrivateBooksSwitch/ShowPrivateBooksSwitch", () => ({
  __esModule: true,
  default: () => <div data-testid="show-private-books-switch" />,
}));

describe("Header Component", () => {
  it("should render correctly with the books count", () => {
    booksStore.booksList = [
      { author: "George Orwell", name: "1984" },
      { author: "Harper Lee", name: "To Kill a Mockingbird" },
    ];

    render(<Header />);

    expect(screen.getByText("Books Count: 2")).toBeInTheDocument();

    expect(screen.getByTestId("show-private-books-switch")).toBeInTheDocument();
  });
});
