import { buttonsWithTooltip } from "./book-export.utils";

describe('Export Button Utils Test Suite', () => {
    it('should return an array with a Tooltip and a button', () => {
        const node = <></>;
        const btnsNTooltip = buttonsWithTooltip([node, node]);
        const {title} = btnsNTooltip[0].props;
        expect(title).toBe('Default: Everything to CSV');
    })
});