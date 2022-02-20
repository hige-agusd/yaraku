<?php

function exportCsv($books, $column) {
    return function () use ($books, $column) {
        $columns = isset($column) ? [$column] : ['title', 'author'];
        $outputTitle = !isset($column) || $column == 'title';
        $outputAuthor = !isset($column) || $column == 'author';
        $file = fopen('php://output', 'w');
        fputcsv($file, $columns);

        foreach ($books as $book) {
            if ($outputTitle) $row['title']  = $book->title;
            if ($outputAuthor) $row['author'] = $book->author;

            $rowValues = isset($column) ? [$row[$column]] : [$row['title'], $row['author']];

            fputcsv($file, $rowValues);
        }

        fclose($file);
    };
};

function exportXml($books, $column) {
    return function () use ($books, $column) {

        $outputTitle = !isset($column) || $column == 'title';
        $outputAuthor = !isset($column) || $column == 'author';

        $xml = new XMLWriter();
        $xml->openURI('php://output');
        $xml->startDocument('1.0');
        $xml->startElement('books');
        $xml->setIndent(4);

        foreach ($books as $book) {
            $xml->startElement('book');

            if ($outputTitle) $xml->writeElement('TITLE', $book->title);
            if ($outputAuthor) $xml->writeElement('AUTHOR', $book->author);

            $xml->endElement();
        }

        $xml->endElement();
        $xml->endDocument();

        $xml->flush();
    };
};