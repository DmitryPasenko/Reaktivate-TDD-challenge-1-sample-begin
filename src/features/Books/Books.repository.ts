import ApiGateway from "../../shared/ApiGateway/ApiGateway";
import { BookDto, BookAddResponse } from "./Books.type";

class BooksRepository {
  private httpGateway: ApiGateway;

  constructor() {
    this.httpGateway = new ApiGateway();
  }

  getBooks = async (): Promise<BookDto[]> => {
    return await this.httpGateway.get("/");
  };
  getPrivateBooks = async (): Promise<BookDto[]> => {
    return await this.httpGateway.get("/private");
  };

  addBook = async ({ name, author }: BookDto): Promise<boolean> => {
    const bookAddDto = await this.httpGateway.post<BookAddResponse>("/", { name, author });
    return bookAddDto && bookAddDto.status === "ok";
  };
}

const booksRepository = new BooksRepository();
export default booksRepository;
