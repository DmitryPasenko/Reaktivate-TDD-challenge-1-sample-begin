import React from "react";
import ReactDOM from "react-dom/client";
import { Container } from "@mui/material";
import "./styles/styles.css";
import AddBookButton from "./components/AddBookButton/AddBookButton";
import BooksList from "./components/BooksList/BooksList";
import Header from "./components/Header/Header";

const App = (): React.ReactElement => {
  return (
    <div>
      <Header />
      <Container>
        <BooksList />
        <AddBookButton />
      </Container>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);
