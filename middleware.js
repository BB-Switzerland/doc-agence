export const config = {
    matcher: '/:path*',
};

// Ces variables seront injectées au moment du build par Vercel
const USER = process.env.AUTH_USER;
const PASS = process.env.AUTH_PASS;

export default function middleware(request) {
    const basicAuth = request.headers.get('authorization');

    if (basicAuth) {
        const authValue = basicAuth.split(' ')[1];
        const [user, pwd] = atob(authValue).split(':');

        if (user === USER && pwd === PASS) {
            return fetch(request);
        }
    }

    return new Response('Authentication required!', {
        status: 401,
        headers: {
            'WWW-Authenticate': 'Basic realm="Protected"',
        },
    });
}
