import { jsonStringify } from './parseJSON';

export default async function httpRequest(method, url, signal, reqBody) {
  const options = reqBody
    ? {
        method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: jsonStringify(reqBody),
        signal,
      }
    : {
        method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        signal,
      };
  const request = await fetch(url, options);

  if (!request.ok) {
    const response = await request.json();
    throw new Error(jsonStringify(response));
  }
  return request.statusText;
}
