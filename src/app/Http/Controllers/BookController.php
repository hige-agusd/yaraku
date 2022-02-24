<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Book;

class BookController extends Controller
{
    /**
     * Show a list of all of the application's books.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $books = new Book();
        $title = request('title');
        $author = request('author');
        if (isset($title)) {
            $books = Book::where('title', 'LIKE', '%' . $title . '%');
        } elseif (isset($author)) {
            $books = Book::where('author', 'LIKE', '%' . $author . '%');
        }

        $orderBy = request('orderBy');
        $sortDir = request('sortDir');
        if (isset($orderBy) && isset($sortDir)) {
            $books = $books->orderBy($orderBy, $sortDir);
        }
        return $books->get();
    }

    public function show($id)
    {
        $book = Book::findOrFail($id);
        return $book;
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'author' => 'required|string',
            'id' => 'nullable|numeric'
        ]);
        $id = request(('id'));
        $book = new Book();
        $book->updateOrInsert(['id' => $id], ['title' => $validated['title'], 'author' => $validated['author']]);
        return $validated;
    }

    public function destroy($id)
    {
        $book = Book::findOrFail($id);
        $book->delete();
    }

    public function exportBooks()
    {
        $format = request('format');
        $format = isset($format) ? $format : 'csv';
        $column = request('column');

        $fileName = 'books' . (isset($column) ? " - {$column}" : '') . '.' . $format;
        $books = Book::all();

        $headers = array(
            "Content-type"        => "text/{$format}",
            "Content-Disposition" => "attachment; filename=$fileName",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        );

        $callback = ($format == 'xml') ? exportXml($books, $column) : exportCsv($books, $column);

        return response()->stream($callback, 200, $headers);
    }
}
