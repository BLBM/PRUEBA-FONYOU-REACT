import React from 'react';
import { Personaje } from '../../types/Personaje';

interface listarPersonajesPropiedades {
  personajes: Personaje[];
  onSelectPersonaje: (personaje: Personaje) => void;
}

export const ListaPersonajes: React.FC<listarPersonajesPropiedades> = ({ personajes, onSelectPersonaje }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-6">
      {personajes.map((personaje) => (
        <div
          key={personaje.id}
          onClick={() => onSelectPersonaje(personaje)}
          className="bg-[#181818] rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex flex-col"
        >
          <div className="relative pb-[140%]">
            <img
              src={personaje.imagenUrl}
              alt={personaje.nombre}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-lg font-semibold mb-2 text-white line-clamp-1">{personaje.nombre}</h3>
            <p className="text-[#808080] mb-2 text-sm line-clamp-1">{personaje.role}</p>
            <p className="text-xs text-[#808080] mt-auto">
              Creado: {new Date(personaje.fechaCreacion).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};