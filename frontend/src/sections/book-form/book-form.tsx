import { Button, Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import { FC } from "react";
import { IBook } from "../../types/types";

interface IBookForm {
  book?: IBook;
  onSubmit: (book: IBook) => void;
}

const BookForm: FC<IBookForm> = ({ book, onSubmit }) => {
  const [form] = useForm();
  const onFinish = (values: any) => onSubmit({ id: book?.id, ...values });
  const onReset = () => form.resetFields();

  form.setFieldsValue(book || { title: "", author: "" });

  return (
    <div>
      <Form form={form} labelCol={{ span: 4 }} onFinish={onFinish}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true }]}
          initialValue={book?.title}
        >
          <Input disabled={!!book?.id} />
        </Form.Item>
        <Form.Item
          label="Author"
          name="author"
          rules={[{ required: true }]}
          initialValue={book?.author}
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

export default BookForm;
