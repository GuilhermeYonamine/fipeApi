// src/App.js
import React, { useState } from 'react';
import TruckList from './components/TruckList';
import CarList from './components/CarList';
import FipeSearch from './components/FipeSearch';
import MotorcycleList from './components/MotorcycleList';
import './App.css';

function App() {
  const [selectedOption, setSelectedOption] = useState('carros');

  return (
    <div className="main-container">
      <div className="App">
        <header>
          <h1>Tabela fipe Vtech</h1>
          <nav>
            <button onClick={() => setSelectedOption('carros')}>Carros</button>
            <button onClick={() => setSelectedOption('caminhoes')}>Caminhões</button>
            <button onClick={() => setSelectedOption('motos')}>Motos</button>
            <button onClick={() => setSelectedOption('fipe')}>Buscar por Código FIPE</button>
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
