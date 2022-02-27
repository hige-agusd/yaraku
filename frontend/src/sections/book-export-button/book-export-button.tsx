import Dropdown from "antd/lib/dropdown/dropdown";
import { FC } from "react";
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
      onClick={() => exportBooks('csv')}
      buttonsRender={buttonsWithTooltip}
    >
      Export Books
    </Dropdown.Button>
  );
};

export default BookExportButton;
