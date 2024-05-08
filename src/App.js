import React from 'react';
import ZonaComponent from './components/ZonaComponent';

const App = () => {
  return (
    <div className="App">
      <h1>Sensor Simulation Dashboard</h1>
      <div className="zona-container">
        <ZonaComponent zonaName="Zona A" />
        <ZonaComponent zonaName="Zona B" />
        <ZonaComponent zonaName="Zona C" />
      </div>
    </div>
  );
};

export default App;
