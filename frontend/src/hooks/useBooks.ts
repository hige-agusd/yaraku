import qs from "qs";
import { useCallback, useEffect, useState } from "react";
import { IBook, IError, IFilter, ISortTable } from "../types/types";
import { mapSortToQueryParam } from "../utils/utils";

const baseUrl = 'http://localhost/api/books';

export interface IUseBookReturn {
    loading: boolean;
    getBooks: () => void;
    editBook: () => void;
    addBook: () => void;
    deleteBook: (id: number) => void;
    setFilterBy: Function;
    setSortBy: Function;
    books: IBook[];
    error: IError | null;
}
const UseBooks = (): IUseBookReturn => {
    const [books, setBooks] = useState<IBook[]>([]);
    const [error, setError] = useState<IError | null>(null);
    const [loading, setLoading] = useState(false);
    const [filterBy, setFilterBy] = useState<IFilter | null>(null);
    const [sortBy, setSortBy] = useState<ISortTable | null>(null);
    
    const getBooks = useCallback(async () => {
        const filterParams = qs.stringify(filterBy);
        const sortParams = qs.stringify(mapSortToQueryParam(sortBy));
        console.log(filterParams);
        
        try {
            setLoading(true);
            const response = await fetch(`${baseUrl}?${filterParams}&${sortParams}`);
            setBooks(await response.json());
        } catch(err) {
            setError(err as any);
        } finally {
            setLoading(false);
        }
    }, [filterBy, sortBy]);

    const editBook = () => {};
    const addBook = () => {};
    const deleteBook = async (id: number) => {
        try {
            setLoading(true);
            await fetch(`${baseUrl}/${id}`, {method: 'DELETE'});            
        } catch(err) {
            setError(err as any);
        } finally {
            setLoading(false);
            getBooks();
        }
    };

    useEffect(() => {
        getBooks();        
    }, [getBooks])


    return {
        loading,
        getBooks,
        editBook,
        addBook,
        deleteBook,
        setFilterBy,
        setSortBy,
        books,
        error,
    }
}

export default UseBooks;