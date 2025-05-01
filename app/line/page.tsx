import {Buffer} from 'buffer';

async function fetchLines() {
    const username = 'admin';
    const password = 'password123';
    const auth = Buffer.from(`${username}:${password}`).toString('base64');
    const res = await fetch('http://localhost:8000/lines', {
        headers: {
            Authorization: `Basic ${auth}`,
        },
        cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch lines');
    //return res.json();
    const data = await res.json();
    return data.lines;
}
export default async function LineListPage() {
    const lines = await fetchLines();
    return (
        <div>
            <h1>Available Lines</h1>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {lines.map((line: any) => (
                    <li key={line.id} style={{
                        backgroundColor: line.color,
                        color: line.text_color,
                        padding: '1rem',
                        marginBottom: '0.5rem',
                        borderRadius: '8px'
                    }}>
                        <a href={`/line/${line.id}`} style={{ textDecoration:
                                'none', color: 'inherit' }}>
                            {line.long_name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
