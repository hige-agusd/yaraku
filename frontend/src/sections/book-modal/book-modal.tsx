import Modal from "antd/lib/modal/Modal";
import { FC } from "react";
import { IBook } from "../../types/types";
import BookFormContainer from "../book-form/book-form.container";

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
  closeModal,
  book,
}) => {

  return (
    <Modal
      visible={modalVisible}
      title={title}
      onCancel={closeModal}
      footer={null}
      forceRender
    >
      <BookFormContainer book={book} onSubmit={handleSubmit} />
    </Modal>
  );
};

export default BookModal;
