import React, { useState } from 'react';
import { Personaje } from '../../types/Personaje';
import { EditarPersonajeForm } from './EditarPersonajeForm';
import { actualizarPersonaje, eliminarPersonaje } from '../../services/personajesApi';
import { Edit, Trash2, X } from 'lucide-react';

interface CaracteristcasPersanjeProp {
  personaje: Personaje;
  onClose: () => void;
  onUpdate: () => void;
}

export const DetallePersonaje: React.FC<CaracteristcasPersanjeProp> = ({ personaje, onClose, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [currentPersonaje, setCurrentPersonaje] = useState(personaje);
  const [error, setError] = useState<string | null>(null);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await eliminarPersonaje(personaje.id);
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error al eliminar el personaje:', error);
      setError('Error al eliminar el personaje. Por favor, inténtalo de nuevo.');
    }
  };

  const handleSave = async (updatedPersonaje: Personaje) => {
    try {
      const savedPersonaje = await actualizarPersonaje(updatedPersonaje);
      setCurrentPersonaje(savedPersonaje);
      setIsEditing(false);
      onUpdate();
    } catch (error) {
      console.error('Error al editar el personaje:', error);
      setError('Error al editar el personaje. Por favor, inténtalo de nuevo.');
    }
  };

  if (isEditing) {
    return (
      <EditarPersonajeForm
        personaje={currentPersonaje}
        onSave={handleSave}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-[#181818] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto text-white">
        <div className="p-6">
          {error && (
            <div className="bg-red-500 text-white p-3 rounded mb-4">
              {error}
            </div>
          )}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <h2 className="text-2xl font-bold mb-2 sm:mb-0">{currentPersonaje.nombre}</h2>
            <div className="flex space-x-2 w-full sm:w-auto justify-end">
              <button
                onClick={handleEdit}
                className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
              >
                <Edit className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Editar</span>
              </button>
              <button
                onClick={handleDelete}
                className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center"
              >
                <Trash2 className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Eliminar</span>
              </button>
              <button
                onClick={onClose}
                className="px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 flex items-center"
              >
                <X className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Cerrar</span>
              </button>
            </div>
          </div>
          
          <img
            src={currentPersonaje.imagenUrl}
            alt={currentPersonaje.nombre}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-[#E5E5E5]">Rol</h3>
              <p className="text-[#808080]">{currentPersonaje.role}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-[#E5E5E5]">Descripción</h3>
              <p className="text-[#808080]">{currentPersonaje.descripcion}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-[#E5E5E5]">Fecha de Creación</h3>
              <p className="text-[#808080]">
                {new Date(currentPersonaje.fechaCreacion).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {showDeleteConfirm && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4">
          <h3 className="text-lg font-bold mb-4 text-gray-800">¿Estás seguro de que quieres eliminar este personaje?</h3>
          <p className="mb-4 text-gray-600">Esta acción no se puede deshacer. Esto eliminará permanentemente el personaje y sus datos de nuestros servidores.</p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    )}
    </div>
  );
};

