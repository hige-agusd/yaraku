import { Button } from "antd";
import { FC } from "react";
import { IUseBookReturn } from "../../hooks/useBooks";
import { IBook } from "../../types/types";
import BookModal from "../book-modal/book-modal";
import BooksTableView from "../books-table/books-table.view";

interface IMainView extends IUseBookReturn {
  setModalVisible: Function;
  modalVisible: boolean;
}

const MainView: FC<IMainView> = ({
  loading,
  getBooks,
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
  if (error) return <div>Error: {error}</div>;

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
    <div id="main-view">
      <nav>
        <Button onClick={() => addOrEdit()} type="primary">Add Book</Button>
        <Button onClick={() => exportBooks('csv')} type="primary">Export</Button>
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
        book={book}
        title={`${!!book?.id ? 'Edit' : 'Add'} Book`}
      />
    </div>
  );
};

export default MainView;
