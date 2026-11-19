'use client';
import { useRouter } from 'next/navigation';

export default function SearchBar({ initialType = '', initialAuthor = '' }) {
  const router = useRouter();
  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const type = formData.get('type')?.trim();
    const author = formData.get('author')?.trim();
    const params = new URLSearchParams();

    if (type) params.set('type', type);
    if (author) params.set('author', author);

    const query = params.toString();
    router.push(query ? `/books?${query}` : '/books');
  };

  return (
    <form onSubmit={handleSearch} className="search-form">
      <input type="text" name="type" placeholder="Type..." defaultValue={initialType} />
      <input type="text" name="author" placeholder="Author..." defaultValue={initialAuthor} />
      <button type="submit">Search</button>
    </form>
  );
}
