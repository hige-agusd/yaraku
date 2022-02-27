import { shallow } from "enzyme";
import Icon from "./icon";

describe('Icon Test Suite', () => {
    it('should render Pencil Icon', () => {
        const component = shallow(<Icon type="faPencil" />);
        expect(component).toHaveLength(1);
    })
    it('should render Trash Icon', () => {
        const component = shallow(<Icon type="faTrash" />);
        expect(component).toHaveLength(1);
    })
})