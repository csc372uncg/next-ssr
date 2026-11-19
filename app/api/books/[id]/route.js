import { getBookById, updateBookById, deleteBookById } from '@/model/bookModel';
import { auth } from '@/auth/auth-config';

export async function GET(request, { params }) {
  const { id } = await params;
  const book = await getBookById(id);
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
  const session = await auth();
  if (!session) {
    return new Response(JSON.stringify({ error: 'Authentication required' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const { id } = await params;
  const { title, author, read, type } = await request.json();
  const updatedBook = await updateBookById(id, { title, author, read, type });
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
  const session = await auth();
  if (!session) {
    return new Response(JSON.stringify({ error: 'Authentication required' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const { id } = await params;
  const deletedBook = await deleteBookById(id);
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
