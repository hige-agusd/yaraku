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
        factory(Book::class)->create(['title' => 'book 1', 'author' => 'author 1']);
        factory(Book::class)->create(['title' => 'book 2', 'author' => 'author 2']);
        $response = $this->get('/api/books/download');
        $response->assertHeader('Content-Disposition', 'attachment; filename=books.csv');
        $content = $response->streamedContent();
        $this->assertStringContainsString('author', $content);
        $this->assertStringContainsString('author 1', $content);
        $this->assertStringContainsString('author 2', $content);
        $this->assertStringContainsString('title', $content);
        $this->assertStringContainsString('book 1', $content);
        $this->assertStringContainsString('book 2', $content);
    }
    public function testExportCsvOnlyAuthor()
    {
        factory(Book::class)->create(['title' => 'book 1', 'author' => 'author 1']);
        factory(Book::class)->create(['title' => 'book 2', 'author' => 'author 2']);
        $response = $this->get('/api/books/download?column=author');
        $response->assertHeader('Content-Disposition', 'attachment; filename=books - author.csv');
        $content = $response->streamedContent();
        $this->assertStringContainsString('author', $content);
        $this->assertStringContainsString('author 1', $content);
        $this->assertStringContainsString('author 2', $content);
        $this->assertStringNotContainsString('title', $content);
        $this->assertStringNotContainsString('book 1', $content);
        $this->assertStringNotContainsString('book 2', $content);
    }
    public function testExportXml()
    {
        factory(Book::class)->create(['title' => 'book 1', 'author' => 'author 1']);
        factory(Book::class)->create(['title' => 'book 2', 'author' => 'author 2']);
        $response = $this->get('/api/books/download?column=author&format=xml');
        $content = $response->streamedContent();
        $this->assertStringContainsString('<AUTHOR>author 1</AUTHOR>', $content);
        $this->assertStringNotContainsString('<TITLE>title 1</TITLE>', $content);
    }
}
