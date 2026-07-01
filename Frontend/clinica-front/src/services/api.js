const API_BASE_URL = import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:8000';

function getToken() {
  return localStorage.getItem('accessToken');
}

async function request(path, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers ?? {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const contentType = response.headers.get('content-type');
  const data = contentType?.includes('application/json')
    ? await response.json()
    : null;

  if (!response.ok) {
    const detail = data?.detail ?? 'No se pudo completar la solicitud';
    const message = Array.isArray(detail) ? detail[0]?.msg : detail;
    throw new Error(message);
  }

  return data;
}

export const api = {
  login: (credentials) =>
    request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  getPacientes: () => request('/pacientes/'),

  buscarPacientePorTelefono: (telefono) =>
    request(`/pacientes/buscar?telefono=${encodeURIComponent(telefono)}`),

  getDoctores: () => request('/doctores/'),
};
