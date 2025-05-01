import {Buffer} from 'buffer';

async function fetchRoutes() {
    const username = 'admin';
    const password = 'password123';
    const auth = Buffer.from(`${username}:${password}`).toString('base64');

    const res = await fetch('http://localhost:8000/routes', {
        headers: {
            Authorization: `Basic ${auth}`,
        },
        cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch routes');
    //return res.json();
    const data = await res.json();
    return data.routes;
}
export default async function RouteListPage() {
    const routes = await fetchRoutes();
    return (
        <div>
            <h1>Available Routes</h1>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {routes.map((route: any) => (
                    <li key={route.id} style={{
                        backgroundColor: route.color,
                        color: route.text_color,
                        padding: '1rem',
                        marginBottom: '0.5rem',
                        borderRadius: '8px'
                    }}>
                       <a href={`/route/${route.id}`} style={{ textDecoration:
                                'none', color: 'inherit' }}>
                            {route.long_name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
