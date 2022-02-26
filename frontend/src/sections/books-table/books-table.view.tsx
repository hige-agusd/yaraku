import Table from "antd/lib/table/Table";
import { FC } from "react";
import {
  ExtraType,
  FilterType,
  IBook,
  PaginatorType,
  SorterType,
} from "../../types/types";
import { getColumns } from "./books-table.utils";

import "./books-table.css";
import { SorterResult } from "antd/lib/table/interface";

export interface IBooksTableViewProps {
  books: IBook[];
  onEditBook: Function;
  deleteBook: Function;
  loading: boolean;
  setSortBy: Function;
  setFilterBy: Function;
}
const BooksTableView: FC<IBooksTableViewProps> = ({
  books,
  onEditBook,
  deleteBook,
  loading,
  setSortBy,
  setFilterBy,
}) => {
  const handleChange = (
    _: PaginatorType,
    filters: FilterType,
    sorter: SorterType,
    extra: ExtraType
  ) => {
    if (extra.action === "sort")
      setSortBy({
        orderBy: (sorter as SorterResult<IBook>).columnKey,
        sortDir: (sorter as SorterResult<IBook>).order,
      });
  };
  const columns = getColumns(onEditBook, deleteBook, setFilterBy);
  return (
    <Table
      className="BooksTable"
      dataSource={books}
      columns={columns}
      loading={loading}
      onChange={handleChange}
    />
  );
};

export default BooksTableView;
