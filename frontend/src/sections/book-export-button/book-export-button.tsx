import Dropdown from "antd/lib/dropdown/dropdown";
import Menu from "antd/lib/menu";
import SubMenu from "antd/lib/menu/SubMenu";
import Tooltip from "antd/lib/tooltip";
import { cloneElement, FC, ReactElement } from "react";
import { FileFormat, TColumns } from "../../types/types";

interface IBookExportButton {
    loading: boolean;
    exportBooks: (fileFormat: FileFormat, column?: TColumns) => void;
}

const BookExportButton: FC<IBookExportButton> = ({loading, exportBooks}) => {
  const menu = (
    <Menu>
      <SubMenu title="to CSV">
        <Menu.Item onClick={() => exportBooks('csv', 'title')}>Titles</Menu.Item>
        <Menu.Item onClick={() => exportBooks('csv', 'author')}>Author</Menu.Item>
        <Menu.Item onClick={() => exportBooks('csv')}>Both</Menu.Item>
      </SubMenu>
      <SubMenu title="to XML">
        <Menu.Item onClick={() => exportBooks('xml', 'title')}>Title</Menu.Item>
        <Menu.Item onClick={() => exportBooks('xml', 'author')}>Author</Menu.Item>
        <Menu.Item onClick={() => exportBooks('xml')}>Both</Menu.Item>
      </SubMenu>
    </Menu>
  );

  return (
    <Dropdown.Button
      overlay={menu}
      onClick={() => exportBooks('csv')}
      buttonsRender={([leftButton, rightButton]) => [
        <Tooltip title="Default: Everything to csv" key="leftButton">
          {leftButton}
        </Tooltip>,
        cloneElement(rightButton as ReactElement, { loading }),
      ]}
    >
      Export Books
    </Dropdown.Button>
  );
};

export default BookExportButton;
