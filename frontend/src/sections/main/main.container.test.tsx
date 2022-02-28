import { shallow } from "enzyme"
import MainContainer from "./main.container"

describe('Main Container Test Suite', () => {
    it('should render properly', () => {
        const component = shallow(<MainContainer />);
        expect(component).toHaveLength(1);
    })
})