import qs from "qs";
import { useCallback, useEffect, useState } from "react";
import {
  FileFormat,
  IBook,
  IError,
  IFilter,
  ISortTable,
  TColumns,
} from "../types/types";
import { mapSortToQueryParam } from "../utils/utils";

const baseUrl = "http://localhost/api/books";

export interface IUseBookReturn {
  loading: boolean;
  loadingFile: boolean;
  getBooks: () => void;
  getBookById: (id?: number) => void;
  saveBook: (book: IBook) => void;
  deleteBook: (id: number) => void;
  exportBooks: (fileFormat: FileFormat, column?: TColumns) => void;
  setFilterBy: Function;
  setSortBy: Function;
  books: IBook[];
  book?: IBook;
  error: IError | null;
}
const UseBooks = (): IUseBookReturn => {
  const [books, setBooks] = useState<IBook[]>([]);
  const [book, setBook] = useState<IBook>();
  const [error, setError] = useState<IError | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingFile, setLoadingFile] = useState(false);
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
      setError(err as any);
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
      setError(err as any);
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
      setError(err as any);
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
      setError(err as any);
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
    loadingFile,
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
