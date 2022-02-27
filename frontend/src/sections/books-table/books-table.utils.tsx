import Button from "antd/lib/button/button";
import Input from "antd/lib/input/Input";
import Space from "antd/lib/space";
import { FilterDropdownProps, Key } from "antd/lib/table/interface";
import { ColumnsType } from "antd/lib/table/Table";
import Icon from "../../components/icon/icon";
import { IBookRecord, FilterFunction, TColumns, EditFunction, DeleteFunction } from "../../types/types";

export const rowKeyGetter=(row: IBookRecord) => row.id;

const getColumnSearchProps = (dataIndex: TColumns, setFilterBy: FilterFunction) => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: FilterDropdownProps) => (
    <div style={{ padding: 8 }}>
      <Input
        placeholder={`Search ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={() => handleSearch(setFilterBy, selectedKeys, confirm, dataIndex)}
        style={{ marginBottom: 8, display: 'block' }}
      />
      <Space>
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
        <Button
          type="link"
          size="small"
          onClick={() => {
            confirm({ closeDropdown: false });
            setFilterBy({
              [dataIndex]: selectedKeys[0],
              // searchedColumn: dataIndex,
            });
          }}
        >
          Filter
        </Button>
      </Space>
    </div>
  ),
});

const handleSearch = (setFilterBy: FilterFunction, selectedKeys: Key[], confirm: Function, dataIndex: TColumns) => {
  confirm();
  setFilterBy({
    [dataIndex]: selectedKeys[0],
  });
};

const handleReset = (setFilterBy: FilterFunction, clearFilters: (() => void) | undefined) => {
  clearFilters?.();
  setFilterBy(null);
};

export const getColumns = (editBook: EditFunction, deleteBook: DeleteFunction, setFilterBy: FilterFunction) => (
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
      key: 'action',
      render: (_: string, row: IBookRecord) => (
        <div className="BooksTable-actionsWrapper">
          <span onClick={() => editBook(row.id)}><Icon type="faPencil" /></span>
          <span onClick={() => deleteBook(row.id)}><Icon type="faTrash" /></span>
        </div>
      ) 
    }
  ] as ColumnsType<IBookRecord>
)
  