import { renderHook, act } from "@testing-library/react-hooks";
import * as utils from "../utils/utils";
import { books } from "../mocks/books";
import useBooks from "./useBooks";

describe("useBooks Hook Test Suite", () => {
  let fetch: any;
  beforeEach(() => {
    fetch = global.fetch;
  });
  afterEach(() => {
    global.fetch = fetch;
  });

  it("should get books, filter and sort", async () => {
    // @ts-ignore
    global.fetch = jest.fn(async () => ({
      json: async () => books,
    }));
    const { result, waitForNextUpdate } = renderHook(() => useBooks());
    await waitForNextUpdate();
    expect(result.current.books).toEqual(books);
    act(() => {
      result.current.setSortBy({ orderBy: "title", sortDir: "ascend" });
    });
    expect(result.current.sortBy).toEqual({
      orderBy: "title",
      sortDir: "ascend",
    });
    expect(global.fetch).toHaveBeenCalledWith(
      `http://localhost/api/books?&orderBy=title&sortDir=asc`
    );

    act(() => {
      result.current.setFilterBy({ title: "book" });
    });
    expect(result.current.filterBy).toEqual({ title: "book" });
    expect(global.fetch).toHaveBeenCalledWith(
      `http://localhost/api/books?title=book&orderBy=title&sortDir=asc`
    );

    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
  });

  it("should get book by id", async () => {
    // @ts-ignore
    global.fetch = jest.fn(async () => ({
      json: async () => books[0],
      ok: true,
    }));
    const { result, waitForNextUpdate } = renderHook(() => useBooks());

    act(() => {
      result.current.getBookById(1);
    });
    await waitForNextUpdate();
    expect(global.fetch).toHaveBeenCalledWith("http://localhost/api/books/1");
    expect(result.current.book).toEqual(books[0]);
  });

  it("should save book", async () => {
    // @ts-ignore
    global.fetch = jest.fn(async () => ({
      json: async () => books[0],
    }));
    const { result, waitForNextUpdate } = renderHook(() => useBooks());
    await waitForNextUpdate();
    act(() => {
      result.current.saveBook(books[0]);
    });
    expect(result.current.loading).toBeTruthy();
    await waitForNextUpdate();
    expect(global.fetch).toHaveBeenCalledWith("http://localhost/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(books[0]),
    });
    expect(result.current.loading).toBeFalsy();
  });

  it("should delete book", async () => {
    // @ts-ignore
    global.fetch = jest.fn(async () => ({
      json: async () => books[0],
    }));
    const { result, waitForNextUpdate } = renderHook(() => useBooks());
    await waitForNextUpdate();
    act(() => {
      result.current.deleteBook(1);
    });
    expect(result.current.loading).toBeTruthy();
    await waitForNextUpdate();
    expect(global.fetch).toHaveBeenCalledWith("http://localhost/api/books/1", {
      method: "DELETE",
    });
    expect(result.current.loading).toBeFalsy();
  });

  it("should export files", async () => {
    global.window = Object.create(window);
    const url = "http://test.com";
    Object.defineProperty(window, "location", {
      value: {
        href: url,
      },
    });
    expect(window.location.href).toEqual(url);
    // @ts-ignore
    global.fetch = jest.fn(async () => ({
      json: async () => books,
    }));
    const { result, waitForNextUpdate } = renderHook(() => useBooks());
    await waitForNextUpdate();
    act(() => {
      result.current.exportBooks("csv");
    });
    expect(window.location.href).toBe(
      "http://localhost/api/books/download?format=csv"
    );
  });

  it("should get books - fail", async () => {
    // @ts-ignore
    global.fetch = jest.fn(async () => ({
      ok: false,
      status: 404,
    }));
    const { result, waitForNextUpdate } = renderHook(() => useBooks());
    await waitForNextUpdate();
    expect(result.current.error).toBeTruthy();
  });

  it("should get book by id - fail", async () => {
    // @ts-ignore
    global.fetch = jest
      .fn(async () => ({
        ok: false,
        status: 404,
      }))
      // @ts-ignore
      .mockResolvedValueOnce({ json: async () => books });

    const { result, waitForNextUpdate } = renderHook(() => useBooks());

    act(() => {
      result.current.getBookById(1);
    });
    await waitForNextUpdate();
    expect(global.fetch).toHaveBeenCalledWith("http://localhost/api/books/1");
    expect(result.current.error).toBeTruthy();
  });

  it("should save book - fail", async () => {
    // @ts-ignore
    global.fetch = jest
      .fn(async () => ({
        ok: false,
        status: 404,
      }))
      // @ts-ignore
      .mockResolvedValueOnce({ json: async () => books });
    const showErrorSpy = jest.spyOn(utils, "showError");

    const { result, waitForNextUpdate } = renderHook(() => useBooks());

    act(() => {
      result.current.saveBook(books[0]);
    });
    await waitForNextUpdate();
    expect(global.fetch).toHaveBeenCalledWith("http://localhost/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(books[0]),
    });
    expect(showErrorSpy).toHaveBeenCalled();
  });

  it("should delete book - fail", async () => {
    // @ts-ignore
    global.fetch = jest
      .fn(async () => ({
        ok: false,
        status: 404,
      }))
      // @ts-ignore
      .mockResolvedValueOnce({ json: async () => books });
    const showErrorSpy = jest.spyOn(utils, "showError");

    const { result, waitForNextUpdate } = renderHook(() => useBooks());

    act(() => {
      result.current.deleteBook(1);
    });
    await waitForNextUpdate();
    expect(global.fetch).toHaveBeenCalledWith("http://localhost/api/books/1", {
      method: "DELETE",
    });
    expect(showErrorSpy).toHaveBeenCalled();
  });

  it("should throw - getBookById", async () => {
    // @ts-ignore
    global.fetch = jest
      .fn(() => {
        throw new Error("Test");
      })
      // @ts-ignore
      .mockResolvedValueOnce({ json: async () => books });

    const { result, waitForNextUpdate } = renderHook(() => useBooks());

    act(() => {
      result.current.getBookById(1);
    });
    await waitForNextUpdate();
    expect(result.current.error).toBeDefined();
  });

  it("should throw - saveBook", async () => {
    // @ts-ignore
    global.fetch = jest
      .fn(() => {
        throw new Error("Test");
      })
      // @ts-ignore
      .mockResolvedValueOnce({ json: async () => books });

    const { result, waitForNextUpdate } = renderHook(() => useBooks());

    act(() => {
      result.current.saveBook(books[0]);
    });
    await waitForNextUpdate();
    expect(result.current.error).toBeDefined();
  });

  it("should throw - deleteBook", async () => {
    // @ts-ignore
    global.fetch = jest
      .fn(() => {
        throw new Error("Test");
      })
      // @ts-ignore
      .mockResolvedValueOnce({ json: async () => books });

    const { result, waitForNextUpdate } = renderHook(() => useBooks());

    act(() => {
      result.current.deleteBook(1);
    });
    await waitForNextUpdate();
    expect(result.current.error).toBeDefined();
  });

  it("should set book to undefined", async () => {
        // @ts-ignore
        global.fetch = jest
        .fn(async () => ({
          json: async () => books[0],
          ok: true,
        }))
        // @ts-ignore
        .mockResolvedValueOnce({ json: async () => books });
  
      const { result, waitForNextUpdate } = renderHook(() => useBooks());
  
      act(() => {
        result.current.getBookById();
      });
      await waitForNextUpdate();
      expect(result.current.book).toBeUndefined();  
  });

  it("should return the last book if ids match", async () => {
    // @ts-ignore
    global.fetch = jest
    .fn(async () => ({
      json: async () => books[1],
      ok: true,
    }))
    // @ts-ignore
    .mockResolvedValueOnce({ json: async () => books, ok: true })
    // @ts-ignore
    .mockResolvedValueOnce({ json: async () => books[0], ok: true })

    const { result, waitForNextUpdate } = renderHook(() => useBooks());

    act(() => {
      result.current.getBookById(1);
    });
    await waitForNextUpdate();
    expect(result.current.book).toEqual(books[0]);  

    act(() => {
      result.current.getBookById(1);
    });
    expect(result.current.book).toEqual(books[0]);  
  })
});
