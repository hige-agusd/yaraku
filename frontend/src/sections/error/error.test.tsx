import { Button } from "antd";
import { shallow } from "enzyme"
import ErrorView from "./error"

const reload = window.location.reload;

describe('Error View Test Suite', () => {
    
    beforeAll(() => {
        Object.defineProperty(window, 'location', {
          value: { reload: jest.fn() }
        });
      });
    
      afterAll(() => {
        window.location.reload = reload;
      });

    it('should render', () => {
        const component = shallow(<ErrorView />);
        expect(component).toHaveLength(1);

        const h1 = component.find('h1');
        expect(h1).toHaveLength(1);
        const btn = component.find(Button);
        expect(btn).toHaveLength(1);
        const pre = component.find('pre');
        expect(pre).toHaveLength(0);
    });

    it('should render and show error', () => {
        const component = shallow(<ErrorView error={{name: 'test', message: 'error'}} />);
        const h1 = component.find('h1');
        expect(h1).toHaveLength(1);
        const btn = component.find(Button);
        expect(btn).toHaveLength(1);
        const pre = component.find('pre');
        expect(pre).toHaveLength(1);
    });

    it('should reload', () => {
        const component = shallow(<ErrorView />);
        expect(component).toHaveLength(1);

        const { onClick: reload} = component.find(Button).props();
        // @ts-ignore
        reload?.();
        expect(window.location.reload).toHaveBeenCalled();
    });
});