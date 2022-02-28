import React from "react";
import { shallow } from "enzyme";
import { books } from "../../mocks/books";
import BooksTableView, { IBooksTableViewProps } from "./books-table.view";
import { Table } from "antd";
import { SorterResult } from "antd/lib/table/interface";
import { ExtraType, FilterType, PaginatorType } from "../../types/types";

const booksTableProps: IBooksTableViewProps = {
  books,
  onEditBook: jest.fn(),
  deleteBook: jest.fn(),
  loading: false,
  setSortBy: jest.fn(),
  setFilterBy: jest.fn(),
};

describe("Books Table test suite", () => {
  it("should render the Table component", () => {
    const component = shallow(<BooksTableView {...booksTableProps} />);
    expect(component).toHaveLength(1);
  });
  it("should setSort on change if action is sort", () => {
    const sortObj: SorterResult<object> = {
      columnKey: "title",
      order: "ascend",
    };
    const extraObj: ExtraType = { action: "sort", currentDataSource: books };
    const component = shallow(<BooksTableView {...booksTableProps} />);
    const table = component.find(Table);
    expect(table).toHaveLength(1);
    const { onChange } = table.props();
    onChange?.({} as PaginatorType, {} as FilterType, sortObj, extraObj);
    expect(booksTableProps.setSortBy).toBeCalledWith({
      orderBy: sortObj.columnKey,
      sortDir: sortObj.order,
    });
  });
  it("should not setSort on change if action is not sort", () => {
    const extraObj: ExtraType = { action: "filter", currentDataSource: books };
    const component = shallow(<BooksTableView {...booksTableProps} />);
    const table = component.find(Table);
    expect(table).toHaveLength(1);
    const { onChange } = table.props();
    onChange?.({} as PaginatorType, {} as FilterType, {}, extraObj);
    expect(booksTableProps.setSortBy).not.toBeCalled();
  });
});
