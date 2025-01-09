import React, { useState, useEffect, useCallback } from 'react';
import { Sidebar } from './Sidebar';
import { ListaPersonajes } from './ListaPersonajes';
import { DetallePersonaje } from './DetallesPersonaje';
import { Personaje } from '../../types/Personaje';
import { listarPersonajes } from '../../services/personajesApi';
import { FormPersonaje } from './FormPersonaje';
import { Search, SortAsc, Calendar } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'list' | 'create'>('list');
  const [personajes, setPersonajes] = useState<Personaje[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Personaje | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortType, setSortType] = useState<'nombre' | 'fecha'>('nombre');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchCharacters = useCallback(async () => {
    try {
      setLoading(true);
      const data = await listarPersonajes(sortType);  
      setPersonajes(data);
    } catch (err) {
      setError('Error al cargar los personajes');
      console.error('Error fetching characters:', err);
    } finally {
      setLoading(false);
    }
  }, [sortType]);

  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters, refreshKey]);

  const filteredPersonajes = personajes.filter(personaje =>
    personaje.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCharacterUpdate = useCallback(() => {
    setRefreshKey(prevKey => prevKey + 1);
    setSelectedCharacter(null);
    setActiveTab('list'); // Switch back to list view after creating a character
  }, []);

  const isCreatingCharacter = activeTab === 'create';

  return (
    <div className="flex min-h-screen bg-[#141414] text-white">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-1 p-4">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E50914]"></div>
          </div>
        ) : error ? (
          <div className="p-6 text-[#E50914]">{error}</div>
        ) : (
          <>
            <div className="mb-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="relative w-full md:w-1/2">
                  <input
                    type="text"
                    placeholder="Buscar personajes"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    disabled={isCreatingCharacter}
                    className={`w-full pl-10 pr-4 py-2 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E50914] transition duration-300 ease-in-out ${
                      isCreatingCharacter ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  />
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 ${
                    isCreatingCharacter ? 'opacity-50' : ''
                  }`} size={20} />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSortType('nombre')}
                    disabled={isCreatingCharacter}
                    className={`flex items-center px-4 py-2 rounded-full transition duration-300 ease-in-out ${
                      sortType === 'nombre' 
                        ? 'bg-[#E50914] text-white' 
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    } ${isCreatingCharacter ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <SortAsc size={16} className="mr-2" />
                    <span className="hidden sm:inline">Nombre</span>
                  </button>
                  <button
                    onClick={() => setSortType('fecha')}
                    disabled={isCreatingCharacter}
                    className={`flex items-center px-4 py-2 rounded-full transition duration-300 ease-in-out ${
                      sortType === 'fecha' 
                        ? 'bg-[#E50914] text-white' 
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    } ${isCreatingCharacter ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <Calendar size={16} className="mr-2" />
                    <span className="hidden sm:inline">Fecha</span>
                  </button>
                </div>
              </div>
            </div>

            {activeTab === 'list' ? (
              <ListaPersonajes
                personajes={filteredPersonajes}
                onSelectPersonaje={setSelectedCharacter}
                
              />
            ) : (
              <FormPersonaje onPersonajeCreated={handleCharacterUpdate} />
            )}

            {selectedCharacter && (
              <DetallePersonaje
                personaje={selectedCharacter}
                onClose={() => setSelectedCharacter(null)}
                onUpdate={handleCharacterUpdate}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;

