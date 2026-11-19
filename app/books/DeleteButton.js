'use client';
import { useRouter } from 'next/navigation';

export default function DeleteButton({ bookId }) {
  const router = useRouter();

  const handleDelete = async () => {
    const response = await fetch(`/api/books/${bookId}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      router.push('/books');
      router.refresh();
    }
  };

  return (
    <button onClick={handleDelete} className="delete-button">
      Delete
    </button>
  );
}
