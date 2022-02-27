/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, Input } from "antd";
import { FormInstance } from "antd/lib/form/Form";
import { FC, useEffect } from "react";
import { IBook, IBookFormValues } from "../../types/types";

interface IBookForm {
  book?: IBook;
  onSubmit: (book: IBook) => void;
  form: FormInstance;
  onReset: () => void;
}

const BookFormView: FC<IBookForm> = ({ book, onSubmit, form, onReset}) => {
  const initialValue = book || { title: "", author: "" };
  const onFinish = (values: IBookFormValues) => onSubmit({ id: book?.id, ...values });

  useEffect(() => {
    form.setFieldsValue(book || { title: "", author: "" });  
  }, [book])

  return (
    <div>
      <Form form={form} labelCol={{ span: 4 }} onFinish={onFinish}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true }]}
          initialValue={initialValue?.title}
        >
          <Input disabled={!!book?.id} />
        </Form.Item>
        <Form.Item
          label="Author"
          name="author"
          rules={[{ required: true }]}
          initialValue={initialValue?.author}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 16, span: 19 }}>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BookFormView;
