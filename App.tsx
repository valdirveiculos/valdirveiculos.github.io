
import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import VehicleCard from './components/VehicleCard';
import { WhatsappIcon } from './components/icons/WhatsappIcon';
import { EmailIcon } from './components/icons/EmailIcon';
import { CarIcon } from './components/icons/CarIcon';
import { VEHICLES_DATA } from './constants';
import { Vehicle } from './types';

const App: React.FC = () => {
  const [interestedVehicles, setInterestedVehicles] = useState<number[]>([]);

  const handleToggleInterest = (vehicleId: number) => {
    setInterestedVehicles((prev) =>
      prev.includes(vehicleId)
        ? prev.filter((id) => id !== vehicleId)
        : [...prev, vehicleId]
    );
  };

  const selectedVehicles = useMemo(() => {
    return VEHICLES_DATA.filter(vehicle => interestedVehicles.includes(vehicle.id));
  }, [interestedVehicles]);

  const handleSendWhatsappInquiry = () => {
    const phoneNumber = '5531987574406';
    let message = 'Olá, Valdir! Tenho interesse nos seguintes veículos:\n\n';
    selectedVehicles.forEach(vehicle => {
      message += `- ${vehicle.title} (Valor: R$ ${vehicle.price.toLocaleString('pt-BR')})\n`;
    });
    message += '\nGostaria de mais informações.';
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans text-gray-800">
      <Header />
      <main>
        {/* Veículos a Venda Section */}
        <section id="veiculos" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Veículos à Venda</h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">Confira nosso estoque de veículos selecionados com a qualidade e confiança que só Valdir Veículos oferece.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {VEHICLES_DATA.map((vehicle: Vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  isSelected={interestedVehicles.includes(vehicle.id)}
                  onToggleInterest={handleToggleInterest}
                />
              ))}
            </div>
            {selectedVehicles.length > 0 && (
              <div className="mt-16 text-center p-6 bg-white rounded-lg shadow-lg max-w-3xl mx-auto">
                <h3 className="text-2xl font-bold mb-2">{selectedVehicles.length} veículo(s) selecionado(s)</h3>
                <p className="text-gray-600 mb-4">Pronto para saber mais? Envie sua lista de interesses para nós via WhatsApp!</p>
                <button
                  onClick={handleSendWhatsappInquiry}
                  className="inline-flex items-center gap-2 bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 transition-colors duration-300 shadow-md"
                >
                  <WhatsappIcon className="w-6 h-6" />
                  <span>Enviar Interesse por WhatsApp</span>
                </button>
              </div>
            )}
          </div>
        </section>

        {/* História Section */}
        <section id="historia" className="bg-gray-800 text-white py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-shrink-0">
                <CarIcon className="w-32 h-32 md:w-48 md:h-48 text-blue-400" />
            </div>
            <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Nossa História</h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Valdir é um vendedor de carros populares que há mais de 40 anos comercializa veículos de maneira particular. Com muita dedicação, profundo conhecimento no assunto, honestidade e transparência, construiu uma reputação sólida, sem nunca ter tido quaisquer problemas em mais de 400 transações bem-sucedidas na região da grande Belo Horizonte, MG. Sua paixão é conectar pessoas aos carros ideais para suas necessidades, garantindo sempre a melhor experiência.
                </p>
            </div>
          </div>
        </section>
      </main>
      
      {/* Contato/Footer Section */}
      <footer id="contato" className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Entre em Contato</h2>
            <p className="mb-8 max-w-xl mx-auto">Tem alguma dúvida ou quer agendar uma visita? Fale conosco!</p>
            <div className="flex justify-center items-center gap-6 flex-wrap">
                <a href="https://api.whatsapp.com/send?phone=5531987574406&text=Ol%C3%A1%2C%20Valdir!%20Vi%20seu%20site%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es." target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-green-500 text-white font-semibold py-3 px-5 rounded-lg hover:bg-green-600 transition-colors duration-300">
                    <WhatsappIcon className="w-6 h-6" />
                    <span>WhatsApp: (31) 98757-4406</span>
                </a>
                <a href="mailto:arterealdecoracoes@gmail.com" className="inline-flex items-center gap-3 bg-blue-500 text-white font-semibold py-3 px-5 rounded-lg hover:bg-blue-600 transition-colors duration-300">
                    <EmailIcon className="w-6 h-6" />
                    <span>arterealdecoracoes@gmail.com</span>
                </a>
            </div>
            <div className="mt-10 border-t border-gray-700 pt-6 text-sm text-gray-500">
                <p>&copy; {new Date().getFullYear()} Valdir Veículos. Todos os direitos reservados.</p>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
