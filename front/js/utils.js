// utils.js
export const API_URL = 'http://localhost:3000';

export async function fetchData(endpoint) {
  const res = await fetch(`${API_URL}${endpoint}`);
  if (!res.ok) throw new Error('Error al obtener datos');
  return res.json();
}

export function createElement(tag, className = '', inner = '') {
  const el = document.createElement(tag);
  if (className) el.className = className;
  el.innerHTML = inner;
  return el;
}

export async function postData(endpoint, data) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al enviar los datos');
  return res.json();
}
