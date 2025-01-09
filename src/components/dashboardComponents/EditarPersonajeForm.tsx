import React, { useState } from 'react';
import { Personaje } from '../../types/Personaje';
import { SubirImagen } from './SubirImagen';

interface EditarPersonajeFormProps {
  personaje: Personaje;
  onSave: (personaje: Personaje) => void;
  onCancel: () => void;
}

export const EditarPersonajeForm: React.FC<EditarPersonajeFormProps> = ({ personaje, onSave, onCancel }) => {
  const [editedPersonaje, setEditedPersonaje] = useState<Personaje>(personaje);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedPersonaje(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (imageUrl: string) => {
    setEditedPersonaje(prev => ({ ...prev, imagenUrl: imageUrl }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedPersonaje);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="bg-[#181818] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto text-white p-6">
        <h2 className="text-2xl font-bold mb-4">Editar Personaje</h2>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-300">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={editedPersonaje.nombre}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 text-gray-900
                         focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                         disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none
                         invalid:border-pink-500 invalid:text-pink-600
                         focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-300">Rol</label>
            <input
              type="text"
              id="role"
              name="role"
              value={editedPersonaje.role}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 text-gray-900
                         focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                         disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none
                         invalid:border-pink-500 invalid:text-pink-600
                         focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            />
          </div>

          <div>
            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-300">Descripción</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={editedPersonaje.descripcion}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 text-gray-900
                         focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                         disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none
                         invalid:border-pink-500 invalid:text-pink-600
                         focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Imagen</label>
            <SubirImagen currentImage={editedPersonaje.imagenUrl} onImageUpload={handleImageUpload} />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
};

