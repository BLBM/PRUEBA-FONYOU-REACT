import React from 'react';
import { Link } from 'react-router-dom';

// Componente para la imagen de fondo con efecto de gradiente
const BackgroundImage = ({ src }: { src: string }) => (
  <div className="absolute inset-0 bg-black">
    <div 
      className="absolute inset-0 bg-cover bg-center opacity-50"
      style={{ backgroundImage: `url(${src})` }}
    ></div>
    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
  </div>
);

const Home: React.FC = () => {
  // Usamos la imagen proporcionada desde Imgur
  const backgroundImage = "https://i.imgur.com/JBP8DSI.jpg";

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <BackgroundImage src={backgroundImage} />

      <div className="relative z-10 container mx-auto px-4 py-16">
        <header className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Fon You Cine</h1>
        </header>

        <main>
          <div className="mb-12">
            <h2 className="text-5xl md:text-7xl font-bold mb-4">South Park</h2>
            <h3 className="text-3xl md:text-5xl font-bold mb-8">El regreso de Toallín</h3>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl">
              Explora la nueva y alocada aventura de los chicos de South Park. 
              ¡Toallín está de vuelta y las cosas se van a poner... elevadas!
            </p>
            <Link 
              to="/dashboard" 
              className="inline-block bg-red-600 text-white font-bold py-3 px-8 rounded text-lg transition-colors duration-300 hover:bg-red-700"
            >
              Explorar
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;
