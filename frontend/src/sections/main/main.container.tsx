import { FC } from "react";
import useBooks from "../../hooks/useBooks";
import MainView from "./main.view";

const MainContainer: FC = () => {
    const {loading, books, getBooks, addBook, editBook, deleteBook, error} = useBooks();
    return <MainView 
        loading={loading}
        books={books}
        getBooks={getBooks}
        addBook={addBook}
        editBook={editBook}
        deleteBook={deleteBook}
        error={error}
    />
}

export default MainContainer;