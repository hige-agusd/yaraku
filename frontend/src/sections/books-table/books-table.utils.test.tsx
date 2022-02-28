/* eslint-disable testing-library/render-result-naming-convention */
import { Button, Input, Space } from "antd";
import { shallow } from "enzyme";
import { FC } from "react";
import { ChangeEvent } from "react";
import { books } from "../../mocks/books";
import { IBookRecord } from "../../types/types";
import {
  getColumns,
  getColumnSearchProps,
  handleReset,
  handleSearch,
  rowKeyGetter,
} from "./books-table.utils";

const mockEdit = jest.fn();
const mockDelete = jest.fn();
const mockFilter = jest.fn();
const mockConfirm = jest.fn();
const mockClearFilter = jest.fn();
const mockSetKeys = jest.fn();
const mockSelectedKeys = ["test"];

describe("Books Table Utils Test Suite", () => {
  it("should get the id", () => {
    const id = rowKeyGetter(books[0]);
    expect(id).toBe(books[0].id);
  });

  it("should set the columns correctly", () => {
    const columns = getColumns(mockEdit, mockDelete, mockFilter);
    expect(columns[0].title).toBe("Title");
    expect(columns[0].dataIndex).toBe("title");
    expect(columns[0].key).toBe("title");
    expect(columns[0].sorter).toBeTruthy();

    expect(columns[1].title).toBe("Author");
    expect(columns[1].dataIndex).toBe("author");
    expect(columns[1].key).toBe("author");
    expect(columns[1].sorter).toBeTruthy();

    expect(columns[2].title).toBe("Actions");
    expect(columns[2].key).toBe("actions");
    expect(columns[2].sorter).toBeFalsy();
    const ActionsColumn = columns[2].render as FC<{record: IBookRecord}>;
    const component = shallow(<ActionsColumn record={books[0]} />);
    const spans = component.find('span');
    expect(spans).toHaveLength(2);
    const { onClick: onEdit } = spans.at(0).props();
    
    // @ts-ignore
    onEdit?.();
    expect(mockEdit).toHaveBeenCalled();

    const { onClick: onDelete } = spans.at(1).props();
    // @ts-ignore
    onDelete?.();
    expect(mockDelete).toHaveBeenCalled();

  });

  it("getColumnSearchProps - render FilterDropdown", () => {
    const {filterDropdown: FilterDropdown} = getColumnSearchProps("author", mockFilter);
    const component = shallow(
      <FilterDropdown
            selectedKeys={mockSelectedKeys}
            confirm={mockConfirm}
            setSelectedKeys={mockSetKeys}
            clearFilters={mockClearFilter} prefixCls={""} visible={false}      />
    );
    expect(component).toHaveLength(1);
  });
  
  it("getColumnSearchProps - FilterDropdown: handle change", () => {
    const {filterDropdown: FilterDropdown} = getColumnSearchProps("author", mockFilter);
    const component = shallow(
      <FilterDropdown
            selectedKeys={mockSelectedKeys}
            confirm={mockConfirm}
            setSelectedKeys={mockSetKeys}
            clearFilters={mockClearFilter} prefixCls={""} visible={false}      />
    );
    const { onChange } = component.find(Input).props();
    // @ts-ignore
    onChange?.({ target: { value: 'test' } } as ChangeEvent);
    expect(mockSetKeys).toHaveBeenCalledWith(['test']);
    // @ts-ignore
    onChange?.({ target: { value: '' } } as ChangeEvent);
    expect(mockSetKeys).toHaveBeenCalledWith([]);

    const { onPressEnter } = component.find(Input).props();
    // @ts-ignore
    onPressEnter?.();
    expect(mockFilter).toBeCalled();

    const buttons = component.find(Space).find(Button);
    expect(buttons).toHaveLength(2);

    const { onClick: search } = buttons.at(0).props();
    // @ts-ignore
    search?.();
    expect(mockFilter).toBeCalled();

    const { onClick: reset } = buttons.at(1).props();
    // @ts-ignore
    reset?.();
    expect(mockClearFilter).toBeCalled();
        

  });

  it('should handle reset', () => {
      handleReset(mockFilter, mockClearFilter);
      expect(mockClearFilter).toBeCalled();
      expect(mockFilter).toHaveBeenCalledWith(null);
    });
      
  it('should handle search', () => {
      const mockColumn = 'title';
      const mockValue = ['test'];
      handleSearch(mockFilter, mockValue, mockConfirm, mockColumn);
      expect(mockConfirm).toBeCalled();
      expect(mockFilter).toHaveBeenCalledWith({ [mockColumn]: mockValue[0] });
  });
});
