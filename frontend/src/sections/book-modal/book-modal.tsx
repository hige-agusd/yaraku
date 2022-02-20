import Modal from "antd/lib/modal/Modal";
import { FC } from "react";
import { IBook } from "../../types/types";
import BookForm from "../book-form/book-form";

interface IBookModal {
  modalVisible: boolean;
  title: string;
  loading: boolean;
  closeModal: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  handleSubmit: (book: IBook) => void;
  book?: IBook;
}

const BookModal: FC<IBookModal> = ({
  modalVisible,
  title,
  handleSubmit,
  loading,
  closeModal,
  book,
}) => {

  return (
    <Modal
      visible={modalVisible}
      confirmLoading={loading}
      title={title}
      onCancel={closeModal}
      getContainer={() => document.getElementById('main-view') as HTMLElement}
      footer={null}
    >
      <BookForm book={book} onSubmit={handleSubmit} />
    </Modal>
  );
};

export default BookModal;
