import { IBook } from "../../types/types";

export const getColumns = (editBook: Function, deleteBook: Function) => (
  [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Actions',
      key: 'action',
      render: (_: any, row: IBook) => (
        <>
          <p onClick={() => editBook(row.id)}>Edit</p>
          <p onClick={() => deleteBook(row.id)}>Delete</p>
        </>
      ) 
    }
  ]
)
  