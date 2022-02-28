import Button from "antd/lib/button/button";
import Input from "antd/lib/input/Input";
import Space from "antd/lib/space";
import { ColumnType, FilterDropdownProps, Key } from "antd/lib/table/interface";
import Icon from "../../components/icon/icon";
import { IBookRecord, FilterFn, TColumns, EditFn, DeleteFn, ConfirmFn } from "../../types/types";

export interface IColumnRender<T> {
  value: any;
  record: T,
  index: number;
}

export const rowKeyGetter=(row: IBookRecord) => row.id;

export const getColumnSearchProps = (dataIndex: TColumns, setFilterBy: FilterFn) => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: FilterDropdownProps) => (
    <div style={{ padding: 8 }}>
      <Input
        placeholder={`Search ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={() => handleSearch(setFilterBy, selectedKeys, confirm, dataIndex)}
        style={{ marginBottom: 8, display: 'block' }}
      />
      <Space size="middle" >
        <Button
          type="primary"
          onClick={() => handleSearch(setFilterBy, selectedKeys, confirm, dataIndex)}
          icon=""
          size="small"
          style={{ width: 90 }}
        >
          Search
        </Button>
        <Button onClick={() => handleReset(setFilterBy, clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </Space>
    </div>
  ),
});

export const handleSearch = (setFilterBy: FilterFn, selectedKeys: Key[], confirm: ConfirmFn , dataIndex: TColumns) => {
  confirm();
  setFilterBy({
    [dataIndex]: selectedKeys[0],
  });
};

export const handleReset = (setFilterBy: FilterFn, clearFilters: (() => void) | undefined) => {
  clearFilters?.();
  setFilterBy(null);
};

export const getColumns = (editBook: EditFn, deleteBook: DeleteFn, setFilterBy: FilterFn) => (
  [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: true,
      ...getColumnSearchProps('title', setFilterBy),
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
      sorter: true,
      ...getColumnSearchProps('author', setFilterBy),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: IBookRecord) => (
        <div className="BooksTable-actionsWrapper">
          <span onClick={() => editBook(record.id)}><Icon type="faPencil" /></span>
          <span onClick={() => deleteBook(record.id)}><Icon type="faTrash" /></span>
        </div>
      )
    }
  ] as ColumnType<IBookRecord>[]
)
  