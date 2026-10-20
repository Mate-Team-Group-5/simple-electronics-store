/* eslint-disable @typescript-eslint/no-explicit-any */
const isHasBackend = !!import.meta.env.VITE_SERVER_URL;

const BASE_URL =
  isHasBackend ?
    `${import.meta.env.VITE_SERVER_URL}/api`
  : `${import.meta.env.BASE_URL}api`;

// Error with the HTTP status, so the UI can react differently
// (for example, 409 = email is already taken)
export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

// To have autocompletion and avoid mistypes
type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null, // we can send any data to the server
): Promise<T> {
  const requestUrl = isHasBackend ? url : `${url}.json`;
  const options: RequestInit = { method };

  if (data) {
    // We add body and Content-Type only for the requests with data
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  return fetch(BASE_URL + requestUrl, options).then(async (response) => {
    if (!response.ok) {
      const body = await response.json().catch(() => null);

      throw new ApiError(
        response.status,
        body?.message ?? body?.error ?? response.statusText,
      );
    }

    return response.json();
  });
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: any) => request<T>(url, 'POST', data),
  patch: <T>(url: string, data: any) => request<T>(url, 'PATCH', data),
  delete: (url: string) => request(url, 'DELETE'),
};
