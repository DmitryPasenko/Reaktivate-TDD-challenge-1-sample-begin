import React from "react";

interface BookProps {
  author: string;
  name: string;
}

export const Book: React.FC<BookProps> = ({ author, name }) => {
  return (
    <div>
      {author}: {name}
    </div>
  );
};
