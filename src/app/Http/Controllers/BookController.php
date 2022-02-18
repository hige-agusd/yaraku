<?php
 
namespace App\Http\Controllers;
 
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
            $books = Book::where('title', $title);
        } elseif (isset($author)) {
            $books = Book::where('author', $author);
        }

        $orderBy = request('orderBy');
        $sortDir = request('sortDir');
        if (isset($orderBy) && isset($sortDir)) {
            $books = $books->orderBy($orderBy, $sortDir);
        }
        return $books->get();
    }

    public function show($id) {
        $book = Book::where($id);
        return $book;
    }

    public function find() {
        $title = request('title');
        $author = request('author');
        if (isset($title)) {
            $books = Book::where('title', $title)->get();
        } elseif (isset($author)) {
            $books = Book::where('author', $author)->get();
        } else {
            $books = Book::all();
        }
        return $books;
    }

    public function store() {
        $book = new Book();
        $book->title = request('title');
        $book->author = request('author');
        $book->save();
        return $book;
    }

    public function edit($id) {
        $book = Book::findOrFail($id);
        $book->title = request('title');
        $book->author = request('author');
        $book->save();
        return $book;
    }

    public function destroy($id) {
        $book = Book::findOrFail($id);
        $book->delete();
    }
}

?>