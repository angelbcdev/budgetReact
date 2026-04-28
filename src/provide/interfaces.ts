export interface IBook {
  bookName: string;
  zoom: number;
  lastReadedPage: number;
  totalPages: number;
  lastModifiedDate: string;
  quotes: IQuote[];
  bookID: string;
}
export interface IQuote {
  text: string;
  page: number;
}
