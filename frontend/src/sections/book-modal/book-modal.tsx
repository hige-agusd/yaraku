import Modal from "antd/lib/modal/Modal";
import { FC } from "react";

interface IBookModal {
  modalVisible: boolean;
  title: string;
  loading: boolean;
  setModalVisible: Function;
  handleSubmit: Function;
}

const BookModal: FC<IBookModal> = ({
  modalVisible,
  title,
  handleSubmit,
  loading,
  setModalVisible,
}) => {
  const handleCancel = () => setModalVisible(false);

  const onOk = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();
      handleSubmit(e);
  };

  return (
    <Modal
      visible={modalVisible}
      confirmLoading={loading}
      title={title}
      onOk={onOk}
      onCancel={handleCancel}
    >
      Form
    </Modal>
  );
};

export default BookModal;