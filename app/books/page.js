import {
  getAllBooks, getBooksByAuthor, getBooksByType, getBooksByTypeAndAuthor
} from '@/model/bookModel';
import Link from 'next/link';
import '@/app/books/books.css';
import BookForm from './BookForm';
import DeleteButton from './DeleteButton';
import SearchBar from './SearchBar';
import AuthControls from './AuthControls';
import { auth } from '@/auth/auth-config';

export default async function BooksPage({ searchParams }) {
  const params = await searchParams;
  const type = params?.type?.trim() || '';
  const author = params?.author?.trim() || '';
  const session = await auth();

  let books;
  if (type && author) {
    books = await getBooksByTypeAndAuthor(type, author);
  } else if (type) {
    books = await getBooksByType(type);
  } else if (author) {
    books = await getBooksByAuthor(author);
  } else {
    books = await getAllBooks();
  }

  return (
    <div className="container">
      <h1>Books</h1>
      <AuthControls />
      <SearchBar initialType={type} initialAuthor={author} />
      <article id="books-list">
        {books.map((book) => (
          <div key={book.id} className="book-item">
            <h2>
              <Link href={`/books/${book.id}`}>
                {book.title}
              </Link>
            </h2>
            <p>Author: {book.author}</p>
            <p>Type: {book.type}</p>
            <p>Read: {book.read ? 'Yes' : 'No'}</p>
            {session && <DeleteButton bookId={book.id} />}
            <hr />
          </div>
        ))}
      </article>
      {session ? <BookForm /> : <p>Sign in with GitHub to add a book.</p>}
    </div>
  );
}
