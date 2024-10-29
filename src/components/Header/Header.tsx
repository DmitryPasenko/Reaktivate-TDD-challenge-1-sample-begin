import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { observer } from "mobx-react";
import booksStore from "../../features/Books/Books.store";
import ShowPrivateBooksSwitch from "../ShowPrivateBooksSwitch/ShowPrivateBooksSwitch";

const Header = observer((): React.ReactElement => {
  const { booksList } = booksStore;

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Books Count: {booksList.length}
        </Typography>
        <ShowPrivateBooksSwitch />
      </Toolbar>
    </AppBar>
  );
});

export default Header;
