import { jsonStringify } from './parseJSON';

export async function httpPost(url, data, signal) {
  const request = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: jsonStringify(data),
    signal: signal,
  });

  if (!request.ok) {
    const response = await request.json();
    throw new Error(jsonStringify(response));
  }
  return request.statusText;
}

export async function httpPut(url, data, signal) {
  const request = await fetch(url, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: jsonStringify(data),
    signal: signal,
  });

  if (!request.ok) {
    const response = await request.json();
    throw new Error(jsonStringify(response));
  }
  return request.statusText;
}

export async function httpDelete(url, signal) {
  const request = await fetch(url, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    signal: signal,
  });

  if (!request.ok) {
    const response = await request.json();
    throw new Error(jsonStringify(response));
  }
  return request.statusText;
}
