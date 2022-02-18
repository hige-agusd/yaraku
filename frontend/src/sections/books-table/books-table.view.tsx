import Table from "antd/lib/table/Table";
import { FC } from "react";
import { IBook } from "../../types/types";
import { getColumns } from "./books-table.utils";

interface IBooksTableViewProps {
    books: IBook[];
    editBook: Function;
    deleteBook: Function;
    loading: boolean;
    setSortBy: Function;
    setFilterBy: Function;
}


const BooksTableView: FC<IBooksTableViewProps> = ({books, editBook, deleteBook, loading, setSortBy, setFilterBy}) => {
    const handleChange = (_: any, filters:any, sorter: any, extra: any) => {
        console.log(filters, sorter, extra);
        if (extra.action === 'sort') setSortBy({orderBy: sorter.columnKey, sortDir: sorter.order});
    }
    const columns = getColumns(editBook, deleteBook, setFilterBy);
    return <Table dataSource={books} columns={columns} loading={loading} rowKey={(row) => row.id} onChange={handleChange}  />
}

export default BooksTableView;