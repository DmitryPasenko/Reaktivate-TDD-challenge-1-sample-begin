import React from "react";
import { FormControlLabel, Switch } from "@mui/material";
import { observer } from "mobx-react";
import booksStore from "../../features/Books/Books.store";

const ShowPrivateBooksSwitch = observer((): React.ReactElement => {
  const { showPrivate, setShowPrivate } = booksStore;

  const handleShowPrivateChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setShowPrivate(event.target.checked);
  };

  return (
    <FormControlLabel
      control={
        <Switch color={"secondary"} checked={showPrivate} onChange={handleShowPrivateChange} />
      }
      label="Show Private Books Only"
    />
  );
});

export default ShowPrivateBooksSwitch;
