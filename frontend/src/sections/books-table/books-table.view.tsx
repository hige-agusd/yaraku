import Table from "antd/lib/table/Table";
import { FC } from "react";
import {
  ExtraType,
  FilterFn,
  FilterType,
  IBookRecord,
  ISortTable,
  PaginatorType,
  SorterType,
  TColumns,
} from "../../types/types";
import { getColumns, rowKeyGetter } from "./books-table.utils";

import "./books-table.css";
import { SorterResult } from "antd/lib/table/interface";

export interface IBooksTableViewProps {
  books: IBookRecord[];
  onEditBook: (id?: number) => void;
  deleteBook: (id: number) => void;
  loading: boolean;
  setSortBy: (sort: ISortTable) => void;
  setFilterBy: FilterFn;
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
        orderBy: (sorter as SorterResult<IBookRecord>).columnKey as TColumns,
        sortDir: (sorter as SorterResult<IBookRecord>).order as ISortTable['sortDir'],
      });
  };
  const columns = getColumns(onEditBook, deleteBook, setFilterBy);
  return (
    <Table
      className="BooksTable"
      dataSource={books}
      columns={columns}
      loading={loading}
      pagination={false}
      onChange={handleChange}
      rowKey={rowKeyGetter}
    />
  );
};

export default BooksTableView;
