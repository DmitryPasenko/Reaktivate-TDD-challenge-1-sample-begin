import * as React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Book } from "./Book";
describe("Book Component", () => {
  it("should render correctly", () => {
    const author = "George Orwell";
    const name = "1984";

    render(<Book author={author} name={name} />);

    expect(screen.getByText(name)).toBeInTheDocument();

    expect(screen.getByText(`by ${author}`)).toBeInTheDocument();
  });
});
