import React, { useState } from 'react';
import TruckList from './components/TruckList';
import CarList from './components/CarList';
import FipeSearch from './components/FipeSearch';
import MotorcycleList from './components/MotorcycleList';
import Placa from './components/Placa';
import ConsultaUnitaria from './components/ConsultaUnitaria';
import Consulta from './components/Consultas';
import './App.css';
import carImage from './assets/Carro.png';
import truckImage from './assets/Caminhao.png';
import motoImage from './assets/Moto.png';
import lupa from './assets/Lupa.png';
import PlacaCarro from './assets/PlacaCarro.png'


function App() {
  const [selectedOption, setSelectedOption] = useState('carros');

  const handleButtonClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="main-container">
      <div className="App">
        <header>
          <h1>Tabela Fipe Vtech</h1>
          <nav>
            <button
              id='carro_button'
              className={selectedOption === 'carros' ? 'clicked' : ''}
              onClick={() => handleButtonClick('carros')}
            >
              <img src={carImage} alt="Carros" />
              <span>Carros</span>
            </button>
            <button
              id='caminhao_button'
              className={selectedOption === 'caminhoes' ? 'clicked' : ''}
              onClick={() => handleButtonClick('caminhoes')}
            >
              <img src={truckImage} alt="Caminhões" />
              <span>Caminhões</span>
            </button>
            <button
              id='moto_button'
              className={selectedOption === 'motos' ? 'clicked' : ''}
              onClick={() => handleButtonClick('motos')}
            >
              <img src={motoImage} alt="Motos" />
              <span>Motos</span>
            </button>
            <button
              id='fipe_search_button'
              className={selectedOption === 'fipe' ? 'clicked' : ''}
              onClick={() => handleButtonClick('fipe')}
            >
              <img src={lupa} alt="Buscar por Código FIPE" />
              <span>Buscar por Código FIPE</span>
            </button>
            <button
              id='placa_search_button'
              className={selectedOption === 'placa' ? 'clicked' : ''}
              onClick={() => handleButtonClick('placa')}
            >
              <img src={PlacaCarro} alt="Buscar por placa" />
              <span>Buscar por placa</span>
            </button>
          </nav>
          <div className='botoes_novos'>
            <div className='botoes_novos_container'>
              <button 
                id='pesquisa_unitaria_search_button'
                className={selectedOption === 'consulta_unitaria' ? 'clicked' : ''}
                onClick={() => handleButtonClick('consulta_unitaria')}
              >
                <span>Pesquisa unitária</span>
              </button>
              <button 
                id='quantidade_de_consultas'
                className={selectedOption === 'quantidade_consultas' ? 'clicked' : ''}
                onClick={() => handleButtonClick('quantidade_consultas')}
              >
                <span>Quantidade de consultas</span>
              </button>
            </div>
          </div>
          

        </header>
        <main>
          {selectedOption === 'carros' && <CarList />}
          {selectedOption === 'caminhoes' && <TruckList />}
          {selectedOption === 'motos' && <MotorcycleList />}
          {selectedOption === 'fipe' && <FipeSearch />}
          {selectedOption === 'placa' && <Placa />}
          {selectedOption === 'consulta_unitaria' && <ConsultaUnitaria />}
          {selectedOption === 'quantidade_consultas' && <Consulta />}
        </main>
      </div>
    </div>
  );
}

export default App;
