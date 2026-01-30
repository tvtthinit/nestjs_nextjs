import Link from "next/link";

interface DetailPageProps {
    params: Promise<{ id: string }>;
}

export default async function DetailPage({ params }: DetailPageProps) {
    const { id } = await params; // unwrap params

    return (
        <div>
            <h1>Detail Page</h1>
            <p>You clicked item with ID: {id}</p>
            <Link href="/">Back to Home</Link>
        </div>
    );
}