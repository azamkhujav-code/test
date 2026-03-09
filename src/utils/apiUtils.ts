import { getCSRFToken } from './csrfUtils';

interface RequestOptions extends RequestInit {
  data?: object;
}

export async function apiRequest(url: string, options: RequestOptions = {}): Promise<Response> {
  const csrfToken = getCSRFToken();
  const headers = new Headers(options.headers || {});

  if (csrfToken) {
    headers.set('X-CSRF-Token', csrfToken);
  }

  if (options.data) {
    headers.set('Content-Type', 'application/json');
    options.body = JSON.stringify(options.data);
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response;
}

export async function get(url: string, options: RequestOptions = {}): Promise<Response> {
  return apiRequest(url, { ...options, method: 'GET' });
}

export async function post(url: string, data: object, options: RequestOptions = {}): Promise<Response> {
  return apiRequest(url, { ...options, method: 'POST', data });
}

export async function put(url: string, data: object, options: RequestOptions = {}): Promise<Response> {
  return apiRequest(url, { ...options, method: 'PUT', data });
}

export async function del(url: string, options: RequestOptions = {}): Promise<Response> {
  return apiRequest(url, { ...options, method: 'DELETE' });
}