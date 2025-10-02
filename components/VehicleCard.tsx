
import React, { useState } from 'react';
import { Vehicle } from '../types';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

interface VehicleCardProps {
  vehicle: Vehicle;
  isSelected: boolean;
  onToggleInterest: (id: number) => void;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, isSelected, onToggleInterest }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % vehicle.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + vehicle.images.length) % vehicle.images.length);
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl">
      <div className="relative">
        <img src={vehicle.images[currentImageIndex]} alt={vehicle.title} className="w-full h-56 object-cover" />
        {vehicle.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
              aria-label="Previous Image"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
              aria-label="Next Image"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full">
              {currentImageIndex + 1} / {vehicle.images.length}
            </div>
          </>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2">{vehicle.title}</h3>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600 mb-4">
          <p><strong className="font-semibold text-gray-800">Marca:</strong> {vehicle.brand}</p>
          <p><strong className="font-semibold text-gray-800">Modelo:</strong> {vehicle.model}</p>
          <p><strong className="font-semibold text-gray-800">Ano:</strong> {vehicle.year}</p>
        </div>
        <div className="mb-4">
            <p className="text-sm text-gray-600"><strong className="font-semibold text-gray-800">Opcionais:</strong></p>
            <div className="flex flex-wrap gap-2 mt-2">
                {vehicle.options.map((opt, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">{opt}</span>
                ))}
            </div>
        </div>
        <div className="mt-auto">
          <p className="text-2xl font-bold text-blue-600 mb-4">{formatPrice(vehicle.price)}</p>
          <button
            onClick={() => onToggleInterest(vehicle.id)}
            className={`w-full inline-flex items-center justify-center gap-2 font-bold py-2 px-4 rounded-lg transition-colors duration-300 ${
              isSelected
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <CheckCircleIcon className="w-5 h-5" />
            <span>{isSelected ? 'Selecionado' : 'Tenho Interesse'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
