import React from 'react';
import TruckList from './components/TruckList';
import CarList from './components/CarList';
import FipeSearch from './components/FipeSearch';


function App() {
  return (
    <div className="App">
      <CarList />
      <TruckList />
      <FipeSearch />
    </div>
  );
}

export default App;
