import { Button } from "antd";
import { useForm } from "antd/lib/form/Form";
import { FC, memo } from "react";
import { FileFormat, FilterFn, IBook, IBookRecord, ISortTable, TColumns } from "../../types/types";
import BookExportButton from "../book-export-button/book-export-button";
import BookModal from "../book-modal/book-modal";
import BooksTableView from "../books-table/books-table.view";
import ErrorView from "../error/error";

import './main.css';

export interface IMainView {
  loading: boolean;
  getBookById: (id?: number) => void;
  saveBook: (book: IBook) => void;
  deleteBook: (id: number) => void;
  exportBooks: (fileFormat: FileFormat, column?: TColumns) => void;
  setFilterBy: FilterFn;
  setSortBy: (sort: ISortTable) => void;
  books: IBookRecord[];
  book?: IBook;
  error: Error | null;
  setModalVisible: (visible: boolean) => void;
  modalVisible: boolean;
}

const MainView: FC<IMainView> = ({
  loading,
  getBookById,
  saveBook,
  deleteBook,
  exportBooks,
  books,
  book,
  error,
  setSortBy,
  setFilterBy,
  modalVisible,
  setModalVisible,
}) => {

  const [form] = useForm();

  if (error) return <ErrorView error={error} />;

  const addOrEdit = async (id?: number) => {
      await getBookById(id);
      setModalVisible(true);
  }

  const closeModal = () => setModalVisible(false);

  const handleSubmit = (book: IBook) => {
    saveBook(book);
    closeModal();
  }

  return (
    <div id="main-view" className="MainView">
      <nav className="NavBar" >
        <div className="NavBar-buttonsWrapper">
          <Button onClick={() => addOrEdit()} type="primary">Add Book</Button>
          <BookExportButton exportBooks={exportBooks} />
        </div>
      </nav>
      <BooksTableView
        books={books}
        onEditBook={addOrEdit}
        deleteBook={deleteBook}
        loading={loading}
        setSortBy={setSortBy}
        setFilterBy={setFilterBy}
      />
      <BookModal
        loading={loading}
        modalVisible={modalVisible}
        closeModal={closeModal}
        handleSubmit={handleSubmit}
        form={form}
        book={book}
        title={`${!!book?.id ? 'Edit' : 'Add'} Book`}
      />
    </div>
  );
};

export default memo(MainView);
