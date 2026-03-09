const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};

export const apiRequest = async (url: string, method: string, body?: any) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-XSRF-TOKEN': getCookie('XSRF-TOKEN') || '',
  };

  const options: RequestInit = {
    method,
    headers,
    credentials: 'include',
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const refreshCsrfToken = async () => {
  try {
    await fetch('/api/csrf-token');
  } catch (error) {
    console.error('Failed to refresh CSRF token:', error);
  }
};