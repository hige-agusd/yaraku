import { FC } from "react";
import { IUseBookReturn } from "../../hooks/useBooks";
import BooksTableView from "../books-table/books-table.view";

const MainView: FC<IUseBookReturn> = ({loading, getBooks, addBook, editBook, deleteBook, books, error}) => {
    return (
        <div>
            <div>Form</div>
            <BooksTableView books={books} editBook={editBook} deleteBook={deleteBook} loading={loading} />
        </div>
    )
}

export default MainView;