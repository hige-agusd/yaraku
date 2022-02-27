import { FormInstance } from "antd";
import { shallow } from "enzyme";
import { books } from "../../mocks/books";
import BookModal from "./book-modal";

const bookModalProps = {
    modalVisible: true,
    title: 'title',
    handleSubmit: jest.fn(),
    loading: false,
    closeModal: jest.fn(),
    book: books[0],
    form: {} as FormInstance,
  }

describe("Books Modal test suite", () => {
    it("should render the Modal component", () => {
      const component = shallow(<BookModal {...bookModalProps} />);
      expect(component).toHaveLength(1);
    });
});
  