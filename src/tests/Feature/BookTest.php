<?php

namespace Tests\Feature;

use App\Book;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class BookTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testGetBooks()
    {
        factory(Book::class)->create();

        $response = $this->get('/api/books');
        $response->assertStatus(200);
    }
    public function testShowWithInvalidId()
    {
        $response = $this->get('/api/books/test');
        $response->assertStatus(404);
    }
    public function testDestroyWithInvalidId()
    {
        $response = $this->get('/api/books/test');
        $response->assertStatus(404);
    }
    public function testStoreWithoutData()
    {
        $response = $this->post('/api/books', []);
        $response->assertStatus(302);
        $response->assertSessionHasErrors('title');
        $response->assertSessionHasErrors('author');
    }
    public function testStoreBook()
    {
        $newBook = [
            'title' => 'book 1',
            'author' => 'author 1',
        ];
        $response = $this->post('/api/books', $newBook);
        $response->assertStatus(200);
        $response->assertJson($newBook, false);
    }
    public function testUpdateBook()
    {
        $newBook = [
            'id' => 1,
            'title' => 'book 1',
            'author' => 'author 2',
        ];
        $response = $this->post('/api/books', $newBook);
        $response->assertStatus(200);
        $response->assertJson($newBook, false);
    }
    public function testUpdateBookFail()
    {
        $newBook = [
            'id' => 1,
            'title' => 'book 1',
        ];
        $response = $this->post('/api/books', $newBook);
        $response->assertStatus(302);
        $response->assertSessionHasErrors('author');
    }
    public function testDestroyBook()
    {
        $book = factory(Book::class)->create(['id' => 1]);
        // $id = $book->getOriginal()['id'];
        $response = $this->delete("/api/books/1");
        $response->assertStatus(200);
        $this->assertDeleted($book);
    }
    public function testDestroyBookFail()
    {
        factory(Book::class)->create(['id' => 1]);
        $response = $this->delete("/api/books/2");
        $response->assertStatus(404);
    }
    public function testShow()
    {
        $book = factory(Book::class)->create();
        $id = $book->getOriginal()['id'];
        $response = $this->get("/api/books/{$id}");
        $response->assertStatus(200);
    }
    public function testShowNotFound()
    {
        $response = $this->get('/api/books/1');
        $response->assertStatus(404);
    }
    public function testExportCsv()
    {
        $books = [
            (object)['title' => 'book 1', 'author' => 'author 1'],
            (object)['title' => 'book 2', 'author' => 'author 2'],
        ];
        $callback = exportCsv($books, 'author');
        $asd = $callback();
        // dd(typeOf($asd));
        // $this->assertStringContainsString('author', $asd);
        // $this->assertStringContainsString('author 1', $asd);
        // $this->assertStringContainsString('author 2', $asd);
        // $this->assertStringNotContainsString('title', $asd);
    }
    public function testExportXml()
    {
        $books = [
            (object)['title' => 'book 1', 'author' => 'author 1'],
            (object)['title' => 'book 2', 'author' => 'author 2'],
        ];
        $callback = exportXml($books, 'author');
        $asd = $callback();
        $matcherAuthor = array('tag' => 'AUTHOR');
        $matcherTitle = array('tag' => 'TITLE');
        // $this->assertTag($matcherAuthor, $asd);
        // $this->assertNotTag($matcherTitle, $asd);
        // Assert::tag('AUTHOR', $asd);
        // $this->assertStringContainsString('author 2', $asd);
        // $this->assertStringNotContainsString('title', $asd);

        // dd($asd);
    }
}
