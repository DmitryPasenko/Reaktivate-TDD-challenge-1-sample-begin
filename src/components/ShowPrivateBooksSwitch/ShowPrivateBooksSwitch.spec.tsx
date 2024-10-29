import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ShowPrivateBooksSwitch from "./ShowPrivateBooksSwitch";
import booksStore from "../../features/Books/Books.store";

jest.mock("../../features/Books/Books.store", () => ({
  __esModule: true,
  default: {
    showPrivate: false,
    setShowPrivate: jest.fn(),
  },
}));

describe("ShowPrivateBooksSwitch Component", () => {
  it("should render correctly with the switch off", () => {
    render(<ShowPrivateBooksSwitch />);

    expect(screen.getByLabelText("Show Private Books Only")).toBeInTheDocument();
    expect(screen.getByLabelText("Show Private Books Only")).not.toBeChecked();
  });

  it("should call setShowPrivate when toggled", () => {
    render(<ShowPrivateBooksSwitch />);

    const switchElement = screen.getByLabelText("Show Private Books Only");
    fireEvent.click(switchElement);

    expect(booksStore.setShowPrivate).toHaveBeenCalledWith(true);
  });
});
