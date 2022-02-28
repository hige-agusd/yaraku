import { message } from "antd";
import { ISort, ISortTable, TSortDirTable } from "../types/types";

enum SortDirection {
  ascend = "asc",
  descend = "desc",
}

export const mapSortToQueryParam = (sortObj: ISortTable | null): ISort | null =>
  sortObj
    ? ({
        ...sortObj,
        sortDir: SortDirection[sortObj?.sortDir as TSortDirTable],
      } as ISort)
    : null;

export const showError = (err: Error) => {
  message.error({
    className: "ErrorMessage",
    content: (
      <p className="ErrorMessage-text">
        <b>{err.name}</b>
        <br />
        {err.message}
      </p>
    ),
  });
};
