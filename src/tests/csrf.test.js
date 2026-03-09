import fetch from 'node-fetch';
import http from 'http';
import app from '../server/auth.js';

let server;
let baseUrl;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(0, () => {
    baseUrl = `http://localhost:${server.address().port}`;
    done();
  });
});

afterAll((done) => {
  server.close(done);
});

describe('CSRF Protection Tests', () => {
  let csrfToken;
  let cookies;

  test('1. Fetch CSRF token', async () => {
    const response = await fetch(`${baseUrl}/api/csrf-token`);
    const data = await response.json();
    csrfToken = data.csrfToken;
    cookies = response.headers.get('set-cookie');
    expect(csrfToken).toBeTruthy();
    expect(cookies).toContain('XSRF-TOKEN');
  });

  test('2. Successful login with valid CSRF token', async () => {
    const response = await fetch(`${baseUrl}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookies,
        'X-XSRF-TOKEN': csrfToken,
      },
      body: JSON.stringify({ email: 'test@example.com', password: 'password' }),
    });
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
  });

  test('3. Failed login attempt without CSRF token', async () => {
    const response = await fetch(`${baseUrl}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookies,
      },
      body: JSON.stringify({ email: 'test@example.com', password: 'password' }),
    });
    expect(response.status).toBe(403);
  });

  test('4. Successful logout with valid CSRF token', async () => {
    const response = await fetch(`${baseUrl}/api/logout`, {
      method: 'POST',
      headers: {
        'Cookie': cookies,
        'X-XSRF-TOKEN': csrfToken,
      },
    });
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
  });

  test('5. Failed logout attempt without CSRF token', async () => {
    const response = await fetch(`${baseUrl}/api/logout`, {
      method: 'POST',
      headers: {
        'Cookie': cookies,
      },
    });
    expect(response.status).toBe(403);
  });

  test('6. Successful protected action with valid CSRF token', async () => {
    const response = await fetch(`${baseUrl}/api/protected-action`, {
      method: 'POST',
      headers: {
        'Cookie': cookies,
        'X-XSRF-TOKEN': csrfToken,
      },
    });
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
  });

  test('7. Failed protected action attempt without CSRF token', async () => {
    const response = await fetch(`${baseUrl}/api/protected-action`, {
      method: 'POST',
      headers: {
        'Cookie': cookies,
      },
    });
    expect(response.status).toBe(403);
  });
});