import { FC, useState } from "react";
import useBooks from "../../hooks/useBooks";
import MainView from "./main.view";

const MainContainer: FC = () => {
  const {
    loading,
    books,
    book,
    getBookById,
    saveBook,
    deleteBook,
    exportBooks,
    setFilterBy,
    setSortBy,
    error,
  } = useBooks();

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <MainView
      loading={loading}
      books={books}
      getBookById={getBookById}
      saveBook={saveBook}
      deleteBook={deleteBook}
      exportBooks={exportBooks}
      error={error}
      setFilterBy={setFilterBy}
      setSortBy={setSortBy}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      book={book}
    />
  );
};

export default MainContainer;
