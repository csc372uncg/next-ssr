import { getBookById, updateBookById, deleteBookById } from '@/model/bookModel';

export async function GET(request, { params }) {
  const bookId = params.id;
  const book = await getBookById(bookId);
  if (!book) {
    return new Response(JSON.stringify({ error: 'Book not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  return new Response(JSON.stringify(book), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function PUT(request, { params }) {
  const bookId = params.id;
  const { title, author, read, type } = await request.json();
  const updatedBook = await updateBookById(bookId, { title, author, read, type });
  if (!updatedBook) {
    return new Response(JSON.stringify({ error: 'Book not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  return new Response(JSON.stringify(updatedBook), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function DELETE(request, { params }) {
  const bookId = params.id;
  const deletedBook = await deleteBookById(bookId);
  if (!deletedBook) {
    return new Response(JSON.stringify({ error: 'Book not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  return new Response(JSON.stringify(deletedBook), {
    headers: { 'Content-Type': 'application/json' }
  });
}
