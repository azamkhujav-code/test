/**
 * Secure API utility for making authenticated requests
 * Uses HttpOnly cookies for authentication tokens
 * Implements CSRF protection for state-changing operations
 */

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface User {
  email: string;
}

export interface LoginResponse {
  success: boolean;
  user: User;
  csrfToken: string;
}

export interface VerifyResponse {
  success: boolean;
  authenticated: boolean;
  user?: User;
}

// Store CSRF token in memory (not localStorage for security)
let csrfToken: string | null = null;

/**
 * Get CSRF token from server
 */
export async function fetchCsrfToken(): Promise<string> {
  try {
    const response = await fetch('/api/auth/csrf-token', {
      method: 'GET',
      credentials: 'include', // Include cookies
    });

    if (!response.ok) {
      throw new Error('Failed to fetch CSRF token');
    }

    const data = await response.json();
    csrfToken = data.csrfToken;
    return csrfToken || '';
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
    throw error;
  }
}

/**
 * Make authenticated API request with CSRF protection
 */
async function apiRequest<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Merge existing headers
  if (options.headers) {
    const existingHeaders = new Headers(options.headers);
    existingHeaders.forEach((value, key) => {
      headers[key] = value;
    });
  }

  // Add CSRF token for state-changing operations
  if (options.method && ['POST', 'PUT', 'DELETE', 'PATCH'].includes(options.method)) {
    if (!csrfToken) {
      // Fetch CSRF token if not available
      await fetchCsrfToken();
    }
    if (csrfToken) {
      headers['X-CSRF-Token'] = csrfToken;
    }
  }

  try {
    const response = await fetch(endpoint, {
      ...options,
      headers,
      credentials: 'include', // Always include cookies
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || `HTTP error! status: ${response.status}`,
      };
    }

    return data;
  } catch (error) {
    console.error('API request error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

/**
 * Login user with email and password
 */
export async function login(email: string, password: string): Promise<LoginResponse> {
  // Ensure we have a CSRF token before login
  await fetchCsrfToken();

  const response = await apiRequest<LoginResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  if (response.success && response.data) {
    // Update CSRF token from login response
    csrfToken = response.data.csrfToken;
    return response.data;
  }

  throw new Error(response.error || 'Login failed');
}

/**
 * Logout current user
 */
export async function logout(): Promise<void> {
  const response = await apiRequest('/api/auth/logout', {
    method: 'POST',
  });

  // Clear CSRF token on logout
  csrfToken = null;

  if (!response.success) {
    throw new Error(response.error || 'Logout failed');
  }
}

/**
 * Verify if user is authenticated
 */
export async function verifyAuth(): Promise<VerifyResponse> {
  const response = await apiRequest<VerifyResponse>('/api/auth/verify', {
    method: 'GET',
  });

  if (response.success && response.data) {
    return response.data;
  }

  return {
    success: false,
    authenticated: false,
  };
}

/**
 * Get current CSRF token (useful for debugging)
 */
export function getCurrentCsrfToken(): string | null {
  return csrfToken;
}

/**
 * Clear CSRF token (useful for testing or manual logout)
 */
export function clearCsrfToken(): void {
  csrfToken = null;
}
