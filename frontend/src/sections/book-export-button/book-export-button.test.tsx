import { shallow } from "enzyme"
import React from "react";
import BookExportButton from "./book-export-button"

const props = { exportBooks: jest.fn() };

describe('Export Button Test Suite', () => {
    
    it('should render', () => {
        const component = shallow(<BookExportButton {...props} />);
        expect(component).toHaveLength(1);
    });

    it('should export', () => {
        const { exportBooks } = props;
        const component = shallow(<BookExportButton {...props} />);
        // Default
        const { onClick } = component.find('[data-test-id="d-btn"]').props();
        onClick?.({} as React.MouseEvent);
        expect(exportBooks).toHaveBeenCalledWith('csv');
    });
});