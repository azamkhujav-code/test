import { generateCSRFToken, setCSRFToken, getCSRFToken, validateCSRFToken } from './csrfUtils';

// Mock the document.cookie
Object.defineProperty(global.document, 'cookie', {
  writable: true,
  value: '',
});

// Mock the sessionStorage
const mockSessionStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};
Object.defineProperty(global, 'sessionStorage', {
  value: mockSessionStorage,
});

describe('CSRF Utils', () => {
  beforeEach(() => {
    document.cookie = '';
    jest.clearAllMocks();
  });

  test('generateCSRFToken should return a string', () => {
    const token = generateCSRFToken();
    expect(typeof token).toBe('string');
    expect(token.length).toBe(64); // 32 bytes in hex = 64 characters
  });

  test('setCSRFToken should set a cookie and return a token', () => {
    const token = setCSRFToken();
    expect(document.cookie).toContain('XSRF-TOKEN');
    expect(mockSessionStorage.setItem).toHaveBeenCalledWith('XSRF-TOKEN', token);
  });

  test('getCSRFToken should return the token from sessionStorage', () => {
    const mockToken = 'test-token';
    mockSessionStorage.getItem.mockReturnValue(mockToken);
    const token = getCSRFToken();
    expect(token).toBe(mockToken);
  });

  test('getCSRFToken should return the token from cookie if not in sessionStorage', () => {
    const mockToken = 'test-token';
    document.cookie = `XSRF-TOKEN=${mockToken}`;
    mockSessionStorage.getItem.mockReturnValue(null);
    const token = getCSRFToken();
    expect(token).toBe(mockToken);
  });

  test('validateCSRFToken should return true for matching tokens', () => {
    const mockToken = 'test-token';
    document.cookie = `XSRF-TOKEN=${mockToken}`;
    mockSessionStorage.getItem.mockReturnValue(mockToken);
    const isValid = validateCSRFToken(mockToken);
    expect(isValid).toBe(true);
  });

  test('validateCSRFToken should return false for non-matching tokens', () => {
    const mockToken = 'test-token';
    document.cookie = `XSRF-TOKEN=${mockToken}`;
    mockSessionStorage.getItem.mockReturnValue(mockToken);
    const isValid = validateCSRFToken('wrong-token');
    expect(isValid).toBe(false);
  });
});