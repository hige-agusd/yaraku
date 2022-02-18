import { Button } from "antd";
import { FC } from "react";
import { IUseBookReturn } from "../../hooks/useBooks";
import BookModal from "../book-modal/book-modal";
import BooksTableView from "../books-table/books-table.view";

interface IMainView extends IUseBookReturn {
  setModalVisible: Function;
  modalVisible: boolean;
}

const MainView: FC<IMainView> = ({
  loading,
  getBooks,
  addBook,
  editBook,
  deleteBook,
  books,
  error,
  setSortBy,
  setFilterBy,
  modalVisible,
  setModalVisible,
}) => {
  if (error) return <div>Error: {error}</div>;
  return (
    <div>
      <nav><Button onClick={() => setModalVisible(true)} type="primary">Add Book</Button></nav>
      <BooksTableView
        books={books}
        editBook={editBook}
        deleteBook={deleteBook}
        loading={loading}
        setSortBy={setSortBy}
        setFilterBy={setFilterBy}
      />
      <BookModal
        loading={loading}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleSubmit={() => {}}
        title="Title"
      />
    </div>
  );
};

export default MainView;
