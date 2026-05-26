const BASE_URL = `${import.meta.env.VITE_API_HOST || 'http://localhost:8000'}/v1`;

export async function signup(data) {
  const res = await fetch(`${BASE_URL}/account/signup/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  console.log('signup result', result);
  if (!res.ok) {
    return { error: true, message: 'Failed To Sign Up' };
  }
  return result;
}

export async function login(data) {
  const res = await fetch(`${BASE_URL}/token/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    return { error: true, message: result.detail };
  }
  return result;
}
