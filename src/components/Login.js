import React from 'react';

export default function Login() {
    const CLIENT_ID = '46d0dd945c24427b91fbadda22636b74';
    const REDIRECT_URI = 'http://localhost:3000/';
    const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
    const RESPONSE_TYPE = 'token';
    const scope = 'playlist-read-private playlist-modify-private user-read-private user-read-email';

    const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${encodeURIComponent(scope)}`;

    return (
        <div>
            <h1>Welcome to Jamming</h1>
            <a href={loginUrl}>Log in</a>
        </div>
    );
};
