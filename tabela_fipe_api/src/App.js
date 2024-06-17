// src/App.js
import React, { useState } from 'react';
import TruckList from './components/TruckList';
import CarList from './components/CarList';
import FipeSearch from './components/FipeSearch';
import MotorcycleList from './components/MotorcycleList';
import './App.css';
import carImage from './assets/Carro.png';
import truckImage from './assets/Caminhao.png';
import motoImage from './assets/Moto.png';
import lupa from './assets/Lupa.png';

function App() {
  const [selectedOption, setSelectedOption] = useState('carros');

  return (
    <div className="main-container">
      <div className="App">
        <header>
          <h1>Tabela Fipe Vtech</h1>
          <nav>
            <button id='carro_button' onClick={() => setSelectedOption('carros')}>
              <img src={carImage} alt="Carros" />
              <span>Carros</span>
            </button>
            <button id='caminhao_button' onClick={() => setSelectedOption('caminhoes')}>
              <img src={truckImage} alt="Caminhões" />
              <span>Caminhões</span>
            </button>
            <button id='moto_button' onClick={() => setSelectedOption('motos')}>
              <img src={motoImage} alt="Motos" />
              <span>Motos</span>
            </button>
            <button id='fipe_search_button' onClick={() => setSelectedOption('fipe')}>
              <img src={lupa} alt="Buscar por Código FIPE" />
              <span>Buscar por Código FIPE</span>
            </button>
          </nav>
        </header>
        <main>
          {selectedOption === 'carros' && <CarList />}
          {selectedOption === 'caminhoes' && <TruckList />}
          {selectedOption === 'motos' && <MotorcycleList />}
          {selectedOption === 'fipe' && <FipeSearch />}
        </main>
      </div>
    </div>
  );
}

export default App;
