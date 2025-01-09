import React from 'react';
import { Users, UserPlus, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  activeTab: 'list' | 'create';
  onTabChange: (tab: 'list' | 'create') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/');
  };

  return (
    <div className="w-20 md:w-64 bg-black min-h-screen p-4 relative overflow-hidden">
      <div className="flex flex-col h-full">
        <div className="flex flex-col space-y-4">

                  
        <button
            onClick={goBack}
            className="w-full flex items-center space-x-2 p-3 rounded-lg transition-colors text-gray-300 hover:bg-gray-900"
          >
            <Home className="h-6 w-6" />
            <span className="hidden md:inline">Volver al Inicio</span>
          </button>

          <button
            onClick={() => onTabChange('list')}
            className={`flex items-center space-x-2 p-3 rounded-lg transition-colors ${
              activeTab === 'list' ? 'bg-[#E50914] text-white' : 'text-gray-300 hover:bg-gray-900'
            }`}
          >
            <Users className="h-6 w-6" />
            <span className="hidden md:inline">Personajes</span>
          </button>
          <button
            onClick={() => onTabChange('create')}
            className={`flex items-center space-x-2 p-3 rounded-lg transition-colors ${
              activeTab === 'create' ? 'bg-[#E50914] text-white' : 'text-gray-300 hover:bg-gray-900'
            }`}
          >
            <UserPlus className="h-6 w-6" />
            <span className="hidden md:inline">Crear Personaje</span>
          </button>
        </div>


        
      </div>
    </div>
  );
};

