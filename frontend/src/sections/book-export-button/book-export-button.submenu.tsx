import { Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import { FC } from "react";
import { FileFormat, TColumns } from "../../types/types";

interface IBookExportButton {
    exportBooks: (fileFormat: FileFormat, column?: TColumns) => void;
}

const BookExportButtonSubMenu: FC<IBookExportButton> = ({exportBooks}) => {
    return (
        <Menu>
            <SubMenu title="to CSV">
                <Menu.Item data-test-id="ct-btn" onClick={() => exportBooks('csv', 'title')}>Titles</Menu.Item>
                <Menu.Item data-test-id="ca-btn" onClick={() => exportBooks('csv', 'author')}>Author</Menu.Item>
                <Menu.Item data-test-id="cb-btn" onClick={() => exportBooks('csv')}>Both</Menu.Item>
            </SubMenu>
            <SubMenu title="to XML">
                <Menu.Item data-test-id="xt-btn" onClick={() => exportBooks('xml', 'title')}>Title</Menu.Item>
                <Menu.Item data-test-id="xa-btn" onClick={() => exportBooks('xml', 'author')}>Author</Menu.Item>
                <Menu.Item data-test-id="xb-btn" onClick={() => exportBooks('xml')}>Both</Menu.Item>
            </SubMenu>
        </Menu>
    );
};

export default BookExportButtonSubMenu;