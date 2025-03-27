import Image from 'next/image';

const books = [
  { title: "Atomic Habits", price: 500, rating: 4.5, image: "/atomic-habits.jpg" },
  { title: "Jungle Book", price: 1200, rating: 4.5, image: "/jungle-book.jpg" },
];

export default function Home() {
  return (
    <div className="p-6">
      <header className="flex justify-between items-center bg-red-500 text-white p-4">
        <h1 className="text-xl font-bold">E-Biblos</h1>
        <input type="text" placeholder="Search" className="p-2 rounded" />
        <div>
          <button className="px-3">Login</button>
          <button className="px-3">Profile</button>
        </div>
      </header>

      <h2 className="mt-4 text-lg font-semibold">Recommended for you</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {books.map((book, index) => (
          <div key={index} className="border p-3 rounded-lg shadow">
            <Image src={book.image} alt={book.title} width={100} height={150} />
            <h3 className="font-semibold">{book.title}</h3>
            <p>Rs. {book.price}</p>
            <p>⭐ {book.rating}</p>
            <button className="mt-2 bg-red-500 text-white px-4 py-1 rounded">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
