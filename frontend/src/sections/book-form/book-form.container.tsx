import { FormInstance } from "antd/lib/form/Form";
import { FC } from "react";
import { IBook } from "../../types/types";
import BookFormView from "./book-form.view";

interface IBookForm {
  book?: IBook;
  onSubmit: (book: IBook) => void;
  form: FormInstance;
}

const BookFormContainer: FC<IBookForm> = ({ book, onSubmit, form }) => {
  const onReset = () => form.resetFields();
  
  return <BookFormView book={book} onSubmit={onSubmit} form={form} onReset={onReset} />
};

export default BookFormContainer;
