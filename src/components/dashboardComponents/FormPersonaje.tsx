import React, { useState } from 'react';
import { crearPersonaje } from '../../services/personajesApi';
import { SubirImagen } from './SubirImagen';
import { PlusCircle } from 'lucide-react';

interface FormPersonajeProps {
  onPersonajeCreated: () => void;
}

export const FormPersonaje: React.FC<FormPersonajeProps> = ({ onPersonajeCreated }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    imagenUrl: '',
    role: '',
    descripcion: '',
    fechaCreacion: new Date().toISOString().slice(0, 16)
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (imageUrl: string) => {
    setFormData(prev => ({ ...prev, imagenUrl: imageUrl }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      await crearPersonaje(formData);
      setSuccess(true);
      setFormData({ nombre: '', imagenUrl: '', role: '', descripcion: '', fechaCreacion: new Date().toISOString().slice(0, 16) });
      onPersonajeCreated();
    } catch (err) {
      setError('Error al crear el personaje. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="bg-[#141414] text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-[#E50914]">Crear Nuevo Personaje</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-300 mb-1">
              Nombre del personaje
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E50914] text-white"
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-1">
              Rol en la serie o película
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E50914] text-white"
            />
          </div>
        </div>
        <div>
          <label htmlFor="descripcion" className="block text-sm font-medium text-gray-300 mb-1">
            Descripción del personaje
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E50914] text-white"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="fechaCreacion" className="block text-sm font-medium text-gray-300 mb-1">
              Fecha y hora de creación
            </label>
            <input
              type="datetime-local"
              id="fechaCreacion"
              name="fechaCreacion"
              value={formData.fechaCreacion}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E50914] text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Imagen o foto
            </label>
            <SubirImagen currentImage={formData.imagenUrl} onImageUpload={handleImageUpload} />
          </div>
        </div>
        {error && (
          <div className="bg-red-900 text-white p-3 rounded-md">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-900 text-white p-3 rounded-md">
            Personaje creado con éxito!
          </div>
        )}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center justify-center px-6 py-3 bg-[#E50914] text-white rounded-md hover:bg-[#B20710] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E50914] transition-colors"
          >
            <PlusCircle size={20} className="mr-2" />
            Crear Personaje
          </button>
        </div>
      </form>
    </div>
  );
};

