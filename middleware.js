export const config = {
    matcher: '/:path*', // Toutes les routes
};

export default function middleware(request) {
    const basicAuth = request.headers.get('authorization');

    if (basicAuth) {
        const authValue = basicAuth.split(' ')[1];
        const [user, pwd] = atob(authValue).split(':');

        if (user === 'admin' && pwd === 'BBteam25') {
            return new Response(null, { status: 200 });
        }
    }

    return new Response('Authentication required!', {
        status: 401,
        headers: {
            'WWW-Authenticate': 'Basic realm="Protected"',
        },
    });
}
