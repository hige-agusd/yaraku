import { FormInstance } from "antd";
import { shallow } from "enzyme";
import { books } from "../../mocks/books";
import BookFormContainer from "./book-form.container";

const mockForm = {
  setFieldsValue: jest.fn(),
}

const bookFormContainerProps = {
    onSubmit: jest.fn(),
    book: books[0],
    form: mockForm as unknown as FormInstance,
  };
  
  describe("Books Form Container test suite", () => {
  
    it("should render the Book Form Container component", () => {
      const component = shallow(<BookFormContainer {...bookFormContainerProps} />);
      expect(component).toHaveLength(1);
    });

    it("should render the Book Form Container without book", () => {
        const component = shallow(<BookFormContainer {...bookFormContainerProps} book={undefined} />);
        expect(component).toHaveLength(1);
      });  
});