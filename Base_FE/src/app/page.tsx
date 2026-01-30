import Link from "next/link";

export default function HomePage() {
  const items = [
    { id: "1", name: "Item One" },
    { id: "2", name: "Item Two" },
  ];

  return (
    <div>
      <h1>Home Page</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {/* Link to detail page */}
            <Link href={`/detail/${item.id}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}