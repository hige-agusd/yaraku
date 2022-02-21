import { FC, useState } from "react";
import useBooks from "../../hooks/useBooks";
import MainView from "./main.view";

const MainContainer: FC = () => {
  const {
    loading,
    loadingFile,
    books,
    book,
    getBooks,
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
      loadingFile={loadingFile}
      books={books}
      getBooks={getBooks}
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
