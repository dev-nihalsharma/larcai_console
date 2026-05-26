var BASE_URL = '';
if (import.meta.env.VITE_DEBUG == 'True') {
  BASE_URL = `${import.meta.env.VITE_API_HOST || 'http://localhost:8000'}/v1`;
} else if (import.meta.env.VITE_DEBUG == 'False') {
  BASE_URL = `/api`;
}

export async function get_api_keys() {
  const token = localStorage.getItem('access');
  if (!token) return null;

  const res = await fetch(`${BASE_URL}/api-keys/api-keys/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await res.json();
  if (!res.ok) throw result;
  return result;
}

export async function create_api_key(keyName) {
  const token = localStorage.getItem('access');
  if (!token) return null;

  const res = await fetch(`${BASE_URL}/api-keys/api-keys/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name: keyName }),
  });
  const result = await res.json();
  if (!res.ok) throw result;
  return result;
}

export async function delete_api_key(key_id) {
  const token = localStorage.getItem('access');
  if (!token) return null;

  const res = await fetch(`${BASE_URL}/api-keys/api-keys/${key_id}/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await res.json();
  if (!res.ok) throw result;
  return result;
}
