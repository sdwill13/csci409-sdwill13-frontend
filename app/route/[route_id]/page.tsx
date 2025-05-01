import {Buffer} from 'buffer';

async function fetchRouteDetail(route_id: string) {
    const username = 'admin';
    const password = 'password123';
    const auth = Buffer.from(`${username}:${password}`).toString('base64');
    const res = await fetch(`http://localhost:8000/routes/${route_id}`, {
        headers: {
            Authorization: `Basic ${auth}`,
        },
        cache: 'no-store',
    });
    if (!res.ok) throw new Error(`Route ${route_id} not found`);
    const data = await res.json();
    console.log("Fetching route data:", data);
    console.log(`Fetching route with ID: http://localhost:8000/routes/${route_id}`);
    return data.route;
}
export default async function RouteDetailPage({ params }: { params: {
        route_id: string } }) {
    const route = await fetchRouteDetail(params.route_id);
    return (
        <div style={{
            backgroundColor: route.color,
            color: route.text_color,
            padding: '2rem',
            borderRadius: '10px'
        }}>
            <h1>{route.long_name}</h1>
            <p><strong>ID:</strong> {route.id}</p>
            <p><strong>Description:</strong> {route.description}</p>
            <a href="/route" style={{ color: route.text_color }}>Back to Route
                List</a>
        </div>
    );
}
