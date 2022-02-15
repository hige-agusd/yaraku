import { Table } from "antd";
import { FC } from "react";
import { IBook } from "../../types/types";
import { getColumns } from "./books-table.utils";

interface IBooksTableViewProps {
    books: IBook[];
    editBook: Function;
    deleteBook: Function;
    loading: boolean;
}

const BooksTableView: FC<IBooksTableViewProps> = ({books, editBook, deleteBook, loading}) => {
    const columns = getColumns(editBook, deleteBook);
    return <Table dataSource={books} columns={columns} loading={loading} rowKey={(row) => row.id} />
}

export default BooksTableView;