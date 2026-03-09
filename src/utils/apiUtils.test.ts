import { apiRequest, get, post, put, del } from './apiUtils';
import { getCSRFToken } from './csrfUtils';

// Mock the getCSRFToken function
jest.mock('./csrfUtils', () => ({
  getCSRFToken: jest.fn(),
}));

// Mock the fetch function
global.fetch = jest.fn();

describe('API Utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('apiRequest should include CSRF token in headers', async () => {
    const mockToken = 'test-token';
    (getCSRFToken as jest.Mock).mockReturnValue(mockToken);
    (global.fetch as jest.Mock).mockResolvedValue({ ok: true });

    await apiRequest('/test-url');

    expect(global.fetch).toHaveBeenCalledWith('/test-url', expect.objectContaining({
      headers: expect.objectContaining({
        'X-CSRF-Token': mockToken,
      }),
      credentials: 'include',
    }));
  });

  test('get should call apiRequest with GET method', async () => {
    const mockApiRequest = jest.spyOn(require('./apiUtils'), 'apiRequest');
    mockApiRequest.mockResolvedValue({ ok: true });

    await get('/test-url');

    expect(mockApiRequest).toHaveBeenCalledWith('/test-url', expect.objectContaining({
      method: 'GET',
    }));
  });

  test('post should call apiRequest with POST method and data', async () => {
    const mockApiRequest = jest.spyOn(require('./apiUtils'), 'apiRequest');
    mockApiRequest.mockResolvedValue({ ok: true });

    const testData = { key: 'value' };
    await post('/test-url', testData);

    expect(mockApiRequest).toHaveBeenCalledWith('/test-url', expect.objectContaining({
      method: 'POST',
      data: testData,
    }));
  });

  test('put should call apiRequest with PUT method and data', async () => {
    const mockApiRequest = jest.spyOn(require('./apiUtils'), 'apiRequest');
    mockApiRequest.mockResolvedValue({ ok: true });

    const testData = { key: 'value' };
    await put('/test-url', testData);

    expect(mockApiRequest).toHaveBeenCalledWith('/test-url', expect.objectContaining({
      method: 'PUT',
      data: testData,
    }));
  });

  test('del should call apiRequest with DELETE method', async () => {
    const mockApiRequest = jest.spyOn(require('./apiUtils'), 'apiRequest');
    mockApiRequest.mockResolvedValue({ ok: true });

    await del('/test-url');

    expect(mockApiRequest).toHaveBeenCalledWith('/test-url', expect.objectContaining({
      method: 'DELETE',
    }));
  });
});