const API_URL = 'https://backend-seman16.onrender.com/api';

export async function getMedicamentos() {
  const res = await fetch(`${API_URL}/medicamentos`, { cache: 'no-store' });
  return res.json();
}




export async function getTipos() {
  const res = await fetch(`${API_URL}/tipos`, { cache: 'no-store' });
  return res.json();
}

export async function createMedicamento(data) {
  const res = await fetch(`${API_URL}/medicamentos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}