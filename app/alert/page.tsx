import { Buffer } from 'buffer';

async function fetchAlerts() {
    const username = 'admin';
    const password = 'password123';
    const auth = Buffer.from(`${username}:${password}`).toString('base64');

    const res = await fetch('http://localhost:8000/alerts', {
        headers: {
            Authorization: `Basic ${auth}`,
        },
        cache: 'no-store',
    });

    if (!res.ok) throw new Error('Failed to fetch alerts');

    const data = await res.json();
    return data.data;
}

export default async function AlertListPage() {
    const alerts = await fetchAlerts();

    return (
        <div>
            <h1>Available Alerts</h1>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {alerts.map((alert: any) => {
                    const attr = alert.attributes;
                    return (
                        <li key={alert.id} style={{
                            backgroundColor: '#ffffff',
                            padding: '1rem',
                            marginBottom: '1rem',
                            borderRadius: '8px',
                            border: '1px solid #cc0000'
                        }}>
                            <h2 style={{ margin: '0 0 0.5rem' }}><strong>{attr.header}</strong></h2>
                            <a href={`/alert/${alert.id}`} style={{
                                display: 'inline-block',
                                marginTop: '1rem',
                                textDecoration: 'none',
                                color: '#fff',
                                backgroundColor: '#cc0000',
                                padding: '0.5rem 1rem',
                                borderRadius: '4px'
                            }}>
                                View Full Alert
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
