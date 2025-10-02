
import React from 'react';
import { CarIcon } from './icons/CarIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#" className="flex items-center gap-3">
            <CarIcon className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-800">Valdir Veículos</span>
          </a>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#veiculos" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-300">Veículos</a>
            <a href="#historia" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-300">História</a>
            <a href="#contato" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-300">Contato</a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
