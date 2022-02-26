import { FilterValue, SorterResult, TableCurrentDataSource, TablePaginationConfig } from "antd/lib/table/interface";

export interface IBook {
    id: number;
    title: string;
    author: string;
}

export type TColumns = 'title' | 'author';
export interface IError {
    status: number;
    msg: string;
}

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

export type FileFormat = 'csv' | 'xml';

export type PaginatorType = TablePaginationConfig;
export type FilterType = Record<string, FilterValue | null>;
export type SorterType = SorterResult<IBook> | SorterResult<IBook>[];
export type ExtraType = TableCurrentDataSource<IBook>;
