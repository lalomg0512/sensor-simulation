import React, { useState, useEffect } from 'react';
import mqtt from 'mqtt'; // Importar la librería MQTT

const ZonaComponent = ({ zonaName }) => {
  const [sensorData, setSensorData] = useState({
    temperatura: '---',
    humedad: '---',
    humo: '---',
    viento: '---',
    nivel_humo: '---',
    incendio_activo: false
  });

  useEffect(() => {
    const client = mqtt.connect("mqtt://192.168.100.17:8083/mqtt"); // Conectar al servidor MQTT local

    const interval = setInterval(() => {
      // Simular datos aleatorios de sensores
      const temperature = Math.floor(Math.random() * (40 - 20 + 1)) + 20;
      const humidity = Math.floor(Math.random() * (80 - 40 + 1)) + 40;
      const smoke = Math.random() > 0.9;
      const windSpeed = Math.floor(Math.random() * (50 - 5 + 1)) + 5;
      const smokeLevel = Math.floor(Math.random() * (80 - 10 + 1)) + 10;

      const newData = {
        temperatura: temperature,
        humedad: humidity,
        humo: smoke,
        viento: windSpeed,
        nivel_humo: smokeLevel,
        incendio_activo: sensorData.incendio_activo
      };

      setSensorData(newData); // Actualizar el estado con los nuevos datos generados

      const jsonData = JSON.stringify(newData);

      // Publicar los datos en el topic correspondiente a la zona
      client.publish(`sensor/${zonaName}`, jsonData);
      console.log('Datos de sensores enviados:', jsonData);
    }, 3000); // Intervalo de generación y envío cada 3 segundos

    return () => {
      clearInterval(interval);
      client.end(); // Cerrar la conexión MQTT al desmontar el componente
    };
  }, [sensorData.incendio_activo, zonaName]);

  const handleFireStart = () => {
    setSensorData((prevState) => ({ ...prevState, incendio_activo: true }));
  };

  const handleFireStop = () => {
    setSensorData((prevState) => ({ ...prevState, incendio_activo: false }));
  };

  return (
    <div>
      <h2>Zona: {zonaName}</h2>
      <p>Temperatura: {sensorData.temperatura} °C</p>
      <p>Humedad: {sensorData.humedad} %</p>
      <p>Humo detectado: {sensorData.humo ? 'Sí' : 'No'}</p>
      <p>Velocidad del viento: {sensorData.viento} km/h</p>
      <p>Nivel de humo: {sensorData.nivel_humo} %</p>

      <button onClick={handleFireStart}>Activar Incendio</button>
      <button onClick={handleFireStop}>Detener Incendio</button>
    </div>
  );
};

export default ZonaComponent;
