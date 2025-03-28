import Link from 'next/link';
import CreateUser from '../components/createUser';

export default async function Blog() {
  return (
    <main>
      <h1 className="text-4xl font-bold">Blog</h1>
      <p>Welcome to my blog! Here you will find articles on various topics.</p>
      <Link
        href="/"
        className="py-1 px-2 bg-blue-900 rounded-sm hover:underline"
      >
        Volver
      </Link>
    </main>
  );
}
