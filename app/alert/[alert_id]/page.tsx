import { Buffer } from 'buffer';

async function fetchAlertDetail(alert_id: string) {
    const username = 'admin';
    const password = 'password123';
    const auth = Buffer.from(`${username}:${password}`).toString('base64');
    const res = await fetch(`http://localhost:8000/alerts/${alert_id}`, {
        headers: {
            Authorization: `Basic ${auth}`,
        },
        cache: 'no-store',
    });

    if (!res.ok) throw new Error(`Alert ${alert_id} not found`);

    const data = await res.json();
    console.log("Fetching alert data:", data);

    return data.data.attributes; // NOT data.data[0]
}
export default async function AlertDetailPage({ params }: { params: { alert_id: string } }) {
    const alert = await fetchAlertDetail(params.alert_id);

    return (
        <div style={{
            backgroundColor: "#FFD700",
            color: "#000",
            padding: '2rem',
            borderRadius: '10px',
            maxWidth: '800px',
            margin: 'auto'
        }}>
            <h1>{alert.header}</h1>
            <p><strong>Cause:</strong> {alert.cause}</p>
            <p><strong>Effect:</strong> {alert.effect}</p>
            <p><strong>Severity:</strong> {alert.severity}</p>
            <p><strong>Timeframe:</strong> {alert.timeframe}</p>
            <p><strong>Created At:</strong> {new Date(alert.created_at).toLocaleString()}</p>
            <p><strong>Description:</strong> {alert.description}</p>

            <a href="/alert" style={{ display: 'block', marginTop: '1rem', color: "#000" }}>
                Back to Alert List
            </a>
        </div>
    );
}
