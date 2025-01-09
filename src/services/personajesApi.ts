import { Personaje } from '../types/Personaje';

const API_BASE_URL = import.meta.env.VITE_API_URL + '/personajes/';


const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Error en la solicitud');
  }
  return response.json();
};

export const listarPersonajes = async (sortBy: 'nombre' | 'fecha' | null): Promise<Personaje[]> => {
  const ordenPersonajes = sortBy === 'nombre' ? 'ordenPorNombre' : sortBy === 'fecha' ? 'ordenPorFecha' : '';
  const response = await fetch(`${API_BASE_URL}${ordenPersonajes}`);
  return handleResponse(response);
};

export const crearPersonaje = async (personaje: Omit<Personaje, 'id' | 'createdAt'>): Promise<Personaje> => {
  const response = await fetch(`${API_BASE_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(personaje),
  });
  return handleResponse(response);
};

export const actualizarPersonaje = async (personaje: Personaje): Promise<Personaje> => {
  const response = await fetch(`${API_BASE_URL}${encodeURIComponent(personaje.id)}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(personaje),
  });
  return handleResponse(response);
};

export const eliminarPersonaje = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
};

