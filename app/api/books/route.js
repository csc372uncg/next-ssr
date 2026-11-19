import { getAllBooks, getBooksByType, getBooksByTypeAndAuthor, addBook } from '@/model/bookModel';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const author = searchParams.get('author');

  if (type && author) {
    const books = await getBooksByTypeAndAuthor(type, author);
    return new Response(JSON.stringify(books), {
      headers: { 'Content-Type': 'application/json' }
    });
  } else if (type) {
    const books = await getBooksByType(type);
    return new Response(JSON.stringify(books), {
      headers: { 'Content-Type': 'application/json' }
    });
  } else {
    const books = await getAllBooks();
    return new Response(JSON.stringify(books), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function POST(request) {
  const { title, author, read, type } = await request.json();
  if (title == null || author == null || read == null || type == null) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  const newBook = await addBook({ title, author, read, type });
  return new Response(JSON.stringify(newBook), {
    headers: { 'Content-Type': 'application/json' }
  });
}
