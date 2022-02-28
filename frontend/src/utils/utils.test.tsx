import { ISort, ISortTable } from "../types/types"
import { mapSortToQueryParam, showError } from "./utils";
import { message as messageMock} from 'antd';

describe('Utils Test Suite', () => {
    it('should map sort object', () => {
        const sortTab: ISortTable = {orderBy: 'author', sortDir: 'ascend'};
        const sorted: ISort | null = mapSortToQueryParam(sortTab);
        expect(sorted).toEqual({orderBy: 'author', sortDir: 'asc'})
    });

    it('should return null', () => {
        const sorted: ISort | null = mapSortToQueryParam(null);
        expect(sorted).toBe(null)
    });

    it('should display error message', () => {
        // @ts-ignore
        const errMsgSpy = jest.spyOn(messageMock, 'error');
        const err: Error = {name: 'test', message: 'test'};
        showError(err);
        expect(errMsgSpy).toBeCalled();
    })
});