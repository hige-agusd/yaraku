import Button from "antd/lib/button/button";
import Input from "antd/lib/input/Input";
import Space from "antd/lib/space";
import { FilterDropdownProps, Key } from "antd/lib/table/interface";
import { ColumnsType } from "antd/lib/table/Table";
import Icon from "../../components/icon/icon";
import { IBook, TColumns } from "../../types/types";

// const sortDirections = ['asc', 'desc'];
// let searchInput;

const getColumnSearchProps = (dataIndex: TColumns, setFilterBy: Function) => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: FilterDropdownProps) => (
    <div style={{ padding: 8 }}>
      <Input
        /* ref={node => {
          searchInput = node;
        }} */
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
  // filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
  /* onFilter: (value: string, record: IBook) =>
    record[dataIndex]
      ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
      : '',
   */
  /* onFilterDropdownVisibleChange: (visible: boolean) => {
    if (visible) {
      setTimeout(() => searchInput.select(), 100);
    }
  }, */
  /* render: text =>
    this.state.searchedColumn === dataIndex ? (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text ? text.toString() : ''}
      />
    ) : (
      text
    ), */
});

const handleSearch = (setFilterBy: Function, selectedKeys: Key[], confirm: Function, dataIndex: TColumns) => {
  confirm();
  setFilterBy({
    [dataIndex]: selectedKeys[0],
    // searchText: selectedKeys[0],
    // searchedColumn: dataIndex,
  });
};

const handleReset = (setFilterBy: Function, clearFilters: (() => void) | undefined) => {
  clearFilters?.();
  setFilterBy(null);
};

export const getColumns = (editBook: Function, deleteBook: Function, setFilterBy: Function) => (
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
      render: (_: any, row: IBook) => (
        <div className="BooksTable-actionsWrapper">
          <span onClick={() => editBook(row.id)}><Icon type="faPencil" /></span>
          <span onClick={() => deleteBook(row.id)}><Icon type="faTrash" /></span>
        </div>
      ) 
    }
  ] as ColumnsType<IBook>
)
  