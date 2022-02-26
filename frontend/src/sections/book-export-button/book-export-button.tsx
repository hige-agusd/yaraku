import Dropdown from "antd/lib/dropdown/dropdown";
import Menu from "antd/lib/menu";
import SubMenu from "antd/lib/menu/SubMenu";
import Tooltip from "antd/lib/tooltip";
import { cloneElement, FC, ReactElement } from "react";
import { FileFormat, TColumns } from "../../types/types";
import BookExportButtonSubMenu from "./book-export-button.submenu";
import { buttonsWithTooltip } from "./book-export.utils";

interface IBookExportButton {
    exportBooks: (fileFormat: FileFormat, column?: TColumns) => void;
}

const BookExportButton: FC<IBookExportButton> = ({exportBooks}) => {
  
  const menu = <BookExportButtonSubMenu exportBooks={exportBooks} />

  return (
    <Dropdown.Button
      data-test-id="d-btn"
      overlay={menu}
      forceRender
      onClick={() => exportBooks('csv')}
      buttonsRender={buttonsWithTooltip}
    >
      Export Books
    </Dropdown.Button>
  );
};

export default BookExportButton;
