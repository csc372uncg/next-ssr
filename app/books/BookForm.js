'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
export default function BookForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [read, setRead] = useState(false);
  const [type, setType] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, author, read, type })
    });
    if (response.ok) {
      setTitle('');
      setAuthor('');
      setRead(false);
      setType('');
      router.push('/books');
    }
  };
  return (
    <form onSubmit={handleSubmit} id="book-form">
      <input
        type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title"
      />
      <input
        type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author"
      />
      <input
        type="text" value={type} onChange={(e) => setType(e.target.value)} placeholder="Type"
      />
      <input
        type="checkbox" checked={read} onChange={(e) => setRead(e.target.checked)}
      />
      <label>Is Read</label>
      <button type="submit">Create Book</button>
    </form>
  );
}
