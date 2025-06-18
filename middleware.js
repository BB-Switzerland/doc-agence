import { NextResponse } from 'next/server';

export const config = {
    matcher: '/:path*', // protège toutes les routes
};

export default function middleware(request) {
    const basicAuth = request.headers.get('authorization');

    if (basicAuth) {
        const value = basicAuth.split(' ')[1];
        const [user, pass] = atob(value).split(':');

        if (user === 'admin' && pass === 'BBteam25') {
            return NextResponse.next();
        }
    }

    return new NextResponse('Authentication required', {
        status: 401,
        headers: {
            'WWW-Authenticate': 'Basic realm="Secure Area"',
        },
    });
}
