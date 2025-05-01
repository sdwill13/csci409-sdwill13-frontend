import { Buffer } from 'buffer';

async function fetchVehicleDetail(vehicle_id: string) {
    const username = 'admin';
    const password = 'password123';
    const auth = Buffer.from(`${username}:${password}`).toString('base64');
    const res = await fetch(`http://localhost:8000/vehicles/${vehicle_id}`, {
        headers: {
            Authorization: `Basic ${auth}`,
        },
        cache: 'no-store',
    });
    if (!res.ok) throw new Error(`Vehicle ${vehicle_id} not found`);
    const data = await res.json();
    console.log("Fetching vehicle data:", data);
    return data.data;  // Return the inner `data` object
}
export default async function VehicleDetailPage({ params }: { params: { vehicle_id: string } }) {
    const vehicle = await fetchVehicleDetail(params.vehicle_id);
    const attr = vehicle.attributes;

    return (
        <div style={{
            backgroundColor: '#f0f0f0',
            color: '#333',
            padding: '2rem',
            borderRadius: '10px',
        }}>
            <h1>Vehicle Label: {attr.label}</h1>
            <p><strong>ID:</strong> {vehicle.id}</p>
            <p><strong>Status:</strong> {attr.current_status}</p>
            <p><strong>Latitude:</strong> {attr.latitude}</p>
            <p><strong>Longitude:</strong> {attr.longitude}</p>
            <p><strong>Bearing:</strong> {attr.bearing}</p>
            <p><strong>Occupancy:</strong> {attr.occupancy_status ?? "N/A"}</p>
            <p><strong>Speed:</strong> {attr.speed ?? "N/A"}</p>
            <p><strong>Updated At:</strong> {attr.updated_at}</p>
            <a href="/vehicle">
                Back to Vehicle List
            </a>
        </div>
    );
}
