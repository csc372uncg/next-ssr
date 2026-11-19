import Link from 'next/link';
import '@/app/books/books.css';

export default function BooksNotFound() {
  return (
    <main className="container">
      <h1>Book Not Found</h1>
      <div className="book-state">
        <p>The book you requested does not exist.</p>
        <Link href="/books">Back to Books</Link>
      </div>
    </main>
  );
}
