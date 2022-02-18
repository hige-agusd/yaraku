import { ISort, ISortTable, TSortDirTable } from "../types/types";

enum SortDirection {
    ascend = 'asc',
    descend = 'desc',
}

export const mapSortToQueryParam = (sortObj: ISortTable | null): ISort | null => ({
    ...sortObj,
    sortDir: SortDirection[sortObj?.sortDir as TSortDirTable],
} as ISort || null)