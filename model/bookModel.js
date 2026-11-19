import pool from '@/model/db.js';

export async function getAllBooks() {
  const result = await pool.query('SELECT * FROM books');
  return result.rows;
}

export async function getBookById(bookId) {
  const result = await pool.query('SELECT * FROM books WHERE id = $1', [bookId]);
  return result.rows[0];
}

export async function deleteBook(bookId) {
  const result = await pool.query('DELETE FROM books WHERE id = $1 RETURNING *', [bookId]);
  return result.rows[0];
}

export async function addBook(book) {
  const { title, author, read, type } = book;
  const result = await pool.query(
    'INSERT INTO books (title, author, read, type) VALUES ($1, $2, $3, $4) RETURNING *',
    [title, author, read, type]
  );
  return result.rows[0];
}

export async function updateBook(bookId, book) {
  const { title, author, read, type } = book;
  const result = await pool.query(
    'UPDATE books SET title = $1, author = $2, read = $3, type = $4 WHERE id = $5 RETURNING *',
    [title, author, read, type, bookId]
  );
  return result.rows[0];
}

export async function getBooksByType(type) {
  const result = await pool.query('SELECT * FROM books WHERE type ILIKE $1', [`%${type}%`]);
  return result.rows;
}

export async function getBooksByTypeAndAuthor(type, author) {
  const result = await pool.query(
    'SELECT * FROM books WHERE  type ILIKE $1 AND author ILIKE $2',
    [`%${type}%`, `%${author}%`]
  );
  return result.rows;
}