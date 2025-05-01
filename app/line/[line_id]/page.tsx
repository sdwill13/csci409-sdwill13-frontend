import { Buffer } from 'buffer';

async function fetchLineDetail(line_id: string) {
    const username = 'admin';
    const password = 'password123';
    const auth = Buffer.from(`${username}:${password}`).toString('base64');
    const res = await fetch(`http://localhost:8000/lines/${line_id}`, {
        headers: {
            Authorization: `Basic ${auth}`,
        },
        cache: 'no-store',
    });
    if (!res.ok) throw new Error(`Line ${line_id} not found`);
    const data = await res.json();
    console.log("Fetching line data:", data);
    return data.line;
}
export default async function LineDetailPage({ params }: { params: { line_id: string } }) {
    const line = await fetchLineDetail(params.line_id);
    return (
        <div style={{
            backgroundColor: `#${line.color}`,
            color: `#${line.text_color}`,
            padding: '2rem',
            borderRadius: '10px'
        }}>
            <h1>{line.long_name}</h1>
            <p><strong>ID:</strong> {line.id}</p>
            <a href="/line" style={{ color: `#${line.text_color}` }}>
                Back to Line List
            </a>
        </div>
    );
}
