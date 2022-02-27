import qs from "qs";
import { useCallback, useEffect, useState } from "react";
import {
  FileFormat,
  FilterFunction,
  IBook,
  IBookRecord,
  IFilter,
  ISortTable,
  TColumns,
} from "../types/types";
import { mapSortToQueryParam } from "../utils/utils";

const baseUrl = "http://localhost/api/books";

export interface IUseBookReturn {
  loading: boolean;
  getBooks: () => void;
  getBookById: (id?: number) => void;
  saveBook: (book: IBook) => void;
  deleteBook: (id: number) => void;
  exportBooks: (fileFormat: FileFormat, column?: TColumns) => void;
  setFilterBy: FilterFunction;
  setSortBy: (sort: ISortTable) => void;
  books: IBookRecord[];
  book?: IBook;
  error: Error | null;
}

const UseBooks = (): IUseBookReturn => {
  const [books, setBooks] = useState<IBookRecord[]>([]);
  const [book, setBook] = useState<IBook>();
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const [filterBy, setFilterBy] = useState<IFilter | null>(null);
  const [sortBy, setSortBy] = useState<ISortTable | null>(null);

  const getBooks = useCallback(async () => {
    const filterParams = qs.stringify(filterBy);
    const sortParams = qs.stringify(mapSortToQueryParam(sortBy));
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}?${filterParams}&${sortParams}`, {
        mode: "cors",
      });
      setBooks(await response.json());
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [filterBy, sortBy]);

  const getBookById = async (id?: number) => {
    if (id === undefined) return setBook(undefined);
    if (id === book?.id) return;
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/${id}`);
      const book = await response.json();
      setBook(book);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const saveBook = async (book: IBook) => {
    try {
      setLoading(true);
      await fetch(`${baseUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      });
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
      getBooks();
    }
  };

  const deleteBook = async (id: number) => {
    try {
      setLoading(true);
      await fetch(`${baseUrl}/${id}`, { method: "DELETE" });
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
      getBooks();
    }
  };

  const exportBooks = (format: FileFormat = "csv", column?: TColumns) => {
      const params = qs.stringify({format, column}, {addQueryPrefix: true});
      window.location.href = `${baseUrl}/download${params}`;
  };

  useEffect(() => {
    getBooks();
  }, [getBooks]);

  return {
    loading,
    getBooks,
    getBookById,
    saveBook,
    deleteBook,
    exportBooks,
    setFilterBy,
    setSortBy,
    books,
    book,
    error,
  };
};

export default UseBooks;
