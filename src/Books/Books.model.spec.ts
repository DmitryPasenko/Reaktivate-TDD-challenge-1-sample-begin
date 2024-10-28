import { BooksModel } from "./Books.model";
import booksRepository from "./Books.repository";
import { mockBooks } from "./Books.mock";
import { BookDto } from "./Books.type";

jest.mock("./Books.repository");

describe("BooksModel", () => {
  let booksModel: BooksModel;

  beforeEach(() => {
    booksModel = new BooksModel();
  });

  it("should fetch books from repository", async () => {
    (booksRepository.getBooks as jest.Mock).mockResolvedValue(mockBooks);

    const books = await booksModel.fetchBooks();

    expect(books).toEqual(mockBooks);
  });

  it("should add a book using repository", async () => {
    const newBook: BookDto = { author: "New Author", name: "New Book" };
    (booksRepository.addBook as jest.Mock).mockResolvedValue(true);

    const success = await booksModel.addBook(newBook);

    expect(success).toBe(true);
    expect(booksRepository.addBook).toHaveBeenCalledWith(newBook);
  });
});
