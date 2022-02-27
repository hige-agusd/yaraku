import { FormInstance } from "antd";
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
  form: FormInstance;
}

const BookModal: FC<IBookModal> = ({
  modalVisible,
  title,
  handleSubmit,
  closeModal,
  book,
  form,
}) => {

  return (
    <Modal
      visible={modalVisible}
      title={title}
      onCancel={closeModal}
      destroyOnClose
      footer={null}
      forceRender={true}
      transitionName=""
      maskTransitionName=""
    >
      <BookFormContainer book={book} onSubmit={handleSubmit} form={form} />
    </Modal>
  );
};

export default BookModal;
