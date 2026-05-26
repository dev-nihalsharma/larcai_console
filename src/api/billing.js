const BASE_URL = `${import.meta.env.VITE_API_HOST || 'http://localhost:8000'}/v1`;

export async function usage_details() {
  const token = localStorage.getItem('access');
  if (!token) return null;

  const res = await fetch(`${BASE_URL}/subscriptions/dashboard/`, {
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

export async function buy_credits({ credits, phone }) {
  const token = localStorage.getItem('access');
  if (!token) throw new Error('Not signed in');

  const res = await fetch(`${BASE_URL}/subscriptions/buy_credits/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ credits, phone }),
  });
  const result = await res.json();
  if (!res.ok) throw result;
  return result;
}

export async function credit_success_callback(orderId) {
  const token = localStorage.getItem('access');
  const q = new URLSearchParams({ order_id: orderId });
  const res = await fetch(`${BASE_URL}/subscriptions/success/?${q.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  const result = await res.json();
  if (!res.ok) throw result;
  return result;
}
