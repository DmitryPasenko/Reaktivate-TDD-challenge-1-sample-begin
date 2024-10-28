export interface BookDto {
  author: string;
  name: string;
}

export interface BookAddResponse {
  status: string;
}

export interface UseBooksController {
  booksList: BookDto[];
  addBook: (book: BookDto) => void;
}
