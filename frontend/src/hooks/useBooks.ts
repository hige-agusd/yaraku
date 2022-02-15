import { useCallback, useEffect, useState } from "react";
import { IBook, IError } from "../types/types";

const baseUrl = 'http://localhost/api/books';

export interface IUseBookReturn {
    loading: boolean;
    getBooks: () => void;
    editBook: () => void;
    addBook: () => void;
    deleteBook: (id: number) => void;
    books: IBook[];
    error: IError | null;
}
const UseBooks = (): IUseBookReturn => {
    const [books, setBooks] = useState<IBook[]>([]);
    const [error, setError] = useState<IError | null>(null);
    const [loading, setLoading] = useState(false);
    
    const getBooks = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch(baseUrl);
            setBooks(await response.json());
        } catch(err) {
            setError(err as any);
        } finally {
            setLoading(false);
        }
    }, []);

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
        books,
        error,
    }
}

export default UseBooks;