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
