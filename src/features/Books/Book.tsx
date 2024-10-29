import React from "react";
import { ListItem, ListItemText } from "@mui/material";

interface BookProps {
  author: string;
  name: string;
}

export const Book: React.FC<BookProps> = ({ author, name }) => {
  return (
    <ListItem disableGutters>
      <ListItemText primary={name} secondary={`by ${author}`} />
    </ListItem>
  );
};
