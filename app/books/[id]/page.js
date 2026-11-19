import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBookById } from '@/model/bookModel';
import DeleteButton from '../DeleteButton';
import '@/app/books/books.css';

export default async function BookDetailsPage({ params }) {
  const { id } = await params;
  const book = await getBookById(id);

  if (!book) {
    notFound();
  }

  return (
    <main className="container">
      <Link href="/books">Back to Books</Link>
      <article className="book-details">
        <h1>{book.title}</h1>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Type:</strong> {book.type}</p>
        <p><strong>Read:</strong> {book.read ? 'Yes' : 'No'}</p>
        <DeleteButton bookId={book.id} />
      </article>
    </main>
  );
}