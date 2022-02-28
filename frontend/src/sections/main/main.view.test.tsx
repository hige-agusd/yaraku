import { Button } from "antd"
import { shallow } from "enzyme"
import { books } from "../../mocks/books"
import { IBook } from "../../types/types"
import BookModal from "../book-modal/book-modal"
import ErrorView from "../error/error"
import MainView, { IMainView } from "./main.view"

const props: IMainView = {
    loading: false,
    getBookById: jest.fn(),
    saveBook: jest.fn(),
    deleteBook: jest.fn(),
    exportBooks: jest.fn(),
    books: books,
    book: books[0],
    error: null,
    setSortBy: jest.fn(),
    setFilterBy: jest.fn(),
    modalVisible: false,
    setModalVisible: jest.fn(),
  }

describe('Main Container Test Suite', () => {
    it('should render properly', () => {
        const component = shallow(<MainView {...props} />);
        expect(component).toHaveLength(1);
    });

    it('should add or edit', async () => {
        const component = shallow(<MainView {...props} />);
        const { onClick: addOrEdit } = component.find(Button).props();
        // @ts-ignore
        await addOrEdit?.();
        expect(props.getBookById).toHaveBeenCalledWith(undefined);
        expect(props.setModalVisible).toHaveBeenCalledWith(true);
    });

    it('should handle submit and show "Edit" in title', async () => {
        const component = shallow(<MainView {...props} />);
        const { handleSubmit, title } = component.find(BookModal).props();
        expect(title).toBe('Edit Book');
        await handleSubmit?.(props.book as IBook);
        expect(props.saveBook).toHaveBeenCalledWith(props.book);
        expect(props.setModalVisible).toHaveBeenCalledWith(false);
    });

    it('should show "Add" in title', async () => {
        const component = shallow(<MainView {...props} book={undefined} />);
        const { handleSubmit, title } = component.find(BookModal).props();
        expect(title).toBe('Add Book');
        await handleSubmit?.(props.book as IBook);
        expect(props.saveBook).toHaveBeenCalledWith(props.book);
        expect(props.setModalVisible).toHaveBeenCalledWith(false);
    });

    it('should show the ErrorView', async () => {
        const component = shallow(<MainView {...props} error={{message: 'error', name: 'test'}} />);
        const errorView = component.find(ErrorView);
        expect(errorView).toHaveLength(1);
    });
})