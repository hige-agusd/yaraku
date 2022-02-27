import { shallow } from "enzyme"
import React from "react";
import BookExportButtonSubMenu from "./book-export-button.submenu"

const props = { exportBooks: jest.fn() };

describe('Export Button Sub Menu Test Suite', () => {
    
    it('should render', () => {
        const component = shallow(<BookExportButtonSubMenu {...props} />);
        expect(component).toHaveLength(1);
    });

    it('should export', () => {
        const { exportBooks } = props;
        const component = shallow(<BookExportButtonSubMenu {...props} />);
        // CSV Title
        const { onClick: clickCTBtn } = component.find('[data-test-id="ct-btn"]').props();
        clickCTBtn?.({} as React.MouseEvent);
        expect(exportBooks).toHaveBeenCalledWith('csv', 'title');
        // CSV Author
        const { onClick: clickCABtn } = component.find('[data-test-id="ca-btn"]').props();
        clickCABtn?.({} as React.MouseEvent);
        expect(exportBooks).toHaveBeenCalledWith('csv', 'author');
        // CSV Both
        const { onClick:clickCBBtn  } = component.find('[data-test-id="cb-btn"]').props();
        clickCBBtn?.({} as React.MouseEvent);
        expect(exportBooks).toHaveBeenCalledWith('csv');
        // XML Title
        const { onClick: clickXTBtn } = component.find('[data-test-id="xt-btn"]').props();
        clickXTBtn?.({} as React.MouseEvent);
        expect(exportBooks).toHaveBeenCalledWith('xml', 'title');
        // XML Author
        const { onClick: clickXABtn } = component.find('[data-test-id="xa-btn"]').props();
        clickXABtn?.({} as React.MouseEvent);
        expect(exportBooks).toHaveBeenCalledWith('csv');
        // XML Both
        const { onClick: clickXBBtn } = component.find('[data-test-id="xb-btn"]').props();
        clickXBBtn?.({} as React.MouseEvent);
        expect(exportBooks).toHaveBeenCalledWith('csv');
    })
});