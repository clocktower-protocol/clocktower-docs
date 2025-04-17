const USERNAME = 'your-username'; // Replace with your desired username
const PASSWORD = 'your-password'; // Replace with your desired password
const REALM = 'Secure Docusaurus Site';

export async function onRequest({ request, next }) {
  const authorization = request.headers.get('authorization');
  if (!authorization) {
    return new Response('Please provide username and password.', {
      status: 401,
      headers: { 'WWW-Authenticate': `Basic realm="${REALM}"` },
    });
  }

  const credentials = parseCredentials(authorization);
  if (credentials[0] !== USERNAME || credentials[1] !== PASSWORD) {
    return new Response('Invalid username or password.', {
      status: 401,
      headers: { 'WWW-Authenticate': `Basic realm="${REALM}"` },
    });
  }

  return next(); // Proceed to serve the site
}

function parseCredentials(authorization) {
  const parts = authorization.split(' ');
  const plainAuth = atob(parts[1]); // Decode base64
  return plainAuth.split(':');
}