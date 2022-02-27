import { Form, FormInstance } from "antd";
import { shallow } from "enzyme";
import React from "react";
import { books } from "../../mocks/books";
import BookFormView from "./book-form.view";

const bookFormViewProps = {
  onSubmit: jest.fn(),
  book: books[0],
  form: {} as FormInstance,
  onReset: jest.fn(),
};

describe("Books Form View test suite", () => {

  it("should render the Book Form View component", () => {
    const component = shallow(<BookFormView {...bookFormViewProps} />);
    expect(component).toHaveLength(1);
  });

  it("should set the values from the book prop into the Form", () => {
    const { book } = bookFormViewProps;
    const component = shallow(<BookFormView {...bookFormViewProps} />);
    const titleInput = component.find('[name="title"]');
    expect(titleInput.prop("initialValue")).toBe(book.title);
    const authorInput = component.find('[name="author"]');
    expect(authorInput.prop("initialValue")).toBe(book.author);
  });

  it("should set the Form values to undefined when no book is passed", () => {
    const component = shallow(<BookFormView {...bookFormViewProps} book={undefined} />);
    const titleInput = component.find('[name="title"]');
    expect(titleInput.prop("initialValue")).toBe('');
    const authorInput = component.find('[name="author"]');
    expect(authorInput.prop("initialValue")).toBe('');
  });

  it("should submit", () => {
    const { book, onSubmit } = bookFormViewProps;
    const component = shallow(<BookFormView {...bookFormViewProps} />);
    const form = component.find(Form);
    const { onFinish } = form.props();
    onFinish?.(book);
    expect(onSubmit).toBeCalled();
  });

  it("should reset fields", () => {
    const { onReset } = bookFormViewProps;
    const component = shallow(<BookFormView {...bookFormViewProps} />);
    const resetBtn = component.find('[htmlType="button"]');
    const { onClick } = resetBtn.props();
    onClick?.({} as React.MouseEvent);
    expect(onReset).toBeCalled();
  });
});
