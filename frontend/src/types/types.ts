import { FilterConfirmProps, FilterValue, SorterResult, TableCurrentDataSource, TablePaginationConfig } from "antd/lib/table/interface";

export interface IBookFormValues {
    title: string;
    author: string;
}

export interface IBook extends IBookFormValues {
    id?: number;
}

export interface IBookRecord extends IBookFormValues {
    id: number;
}

export type TColumns = 'title' | 'author';

export type TSortDirTable = 'ascend' | 'descend';
export interface ISort {
    orderBy: TColumns;
    sortDir: 'asc' | 'desc';
}

export interface ISortTable {
    orderBy: 'title' | 'author';
    sortDir: 'ascend' | 'descend';
}

export interface IFilter {
    author?: string;
    title?: string;
}

export type FilterFn = (param: IFilter | null) => void;
export type SortFn = (param: ISortTable) => void;
export type DeleteFn = (param: number) => void;
export type EditFn = (param: number) => void;
export type ConfirmFn = (param?: FilterConfirmProps) => void;


export type FileFormat = 'csv' | 'xml';

export type PaginatorType = TablePaginationConfig;
export type FilterType = Record<string, FilterValue | null>;
export type SorterType = SorterResult<IBookRecord> | SorterResult<IBookRecord>[];
export type ExtraType = TableCurrentDataSource<IBookRecord>;
