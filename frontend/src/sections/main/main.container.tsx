import { FC, useState } from "react";
import useBooks from "../../hooks/useBooks";
import MainView from "./main.view";

const MainContainer: FC = () => {
  const {
    loading,
    books,
    getBooks,
    addBook,
    editBook,
    deleteBook,
    setFilterBy,
    setSortBy,
    error,
  } = useBooks();

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <MainView
      loading={loading}
      books={books}
      getBooks={getBooks}
      addBook={addBook}
      editBook={editBook}
      deleteBook={deleteBook}
      error={error}
      setFilterBy={setFilterBy}
      setSortBy={setSortBy}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    />
  );
};

export default MainContainer;
