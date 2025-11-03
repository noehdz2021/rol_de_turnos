// Servicio de API para comunicarse con el backend

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Función helper para hacer peticiones
async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Error desconocido' }));
      throw new Error(error.error || `Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error en API:', error);
    throw error;
  }
}

// API de Usuarios
export const usuariosAPI = {
  // Obtener todos los usuarios
  getAll: () => fetchAPI('/usuarios'),

  // Obtener un usuario por ID
  getById: (id) => fetchAPI(`/usuarios/${id}`),

  // Actualizar un usuario
  update: (id, datos) => fetchAPI(`/usuarios/${id}`, {
    method: 'PUT',
    body: datos,
  }),

  // Crear un nuevo usuario
  create: (datos) => fetchAPI('/usuarios', {
    method: 'POST',
    body: datos,
  }),
};

// API de Configuración
export const configuracionAPI = {
  // Obtener configuración completa (config + usuarios)
  get: () => fetchAPI('/configuracion'),

  // Actualizar fecha de inicio
  updateFechaInicio: (fechaInicio) => fetchAPI('/configuracion', {
    method: 'PUT',
    body: { fechaInicio },
  }),
};

// Health check
export const healthCheck = () => fetchAPI('/health');

