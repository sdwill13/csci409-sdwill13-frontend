import { Buffer } from 'buffer';

async function fetchVehicles() {
    const username = 'admin';
    const password = 'password123';
    const auth = Buffer.from(`${username}:${password}`).toString('base64');

    const res = await fetch('http://localhost:8000/vehicles', {
        headers: {
            Authorization: `Basic ${auth}`,
        },
        cache: 'no-store',
    });

    if (!res.ok) throw new Error('Failed to fetch vehicles');

    const data = await res.json();
    return data.data; // Access the array directly from the "data" key
}

export default async function VehicleListPage() {
    const vehicles = await fetchVehicles();

    return (
        <div>
            <h1>Available Vehicles</h1>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {vehicles.map((vehicle: any) => (
                    <li key={vehicle.id} style={{
                        backgroundColor: '#f4f4f4',
                        padding: '1rem',
                        marginBottom: '0.5rem',
                        borderRadius: '8px',
                        border: '1px solid #ccc'
                    }}>
                        <a
                            href={`/vehicle/${vehicle.id}`}
                            style={{
                                textDecoration: 'none',
                                color: '#333',
                                fontWeight: 'bold'
                            }}
                        >
                            Vehicle: {vehicle.attributes.label}
                        </a>
                        <div style={{ marginTop: '0.5rem' }}>
                            Route ID: {vehicle.relationships.route.data.id}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
