import React, { useState, useEffect } from 'react';
import mqtt from 'mqtt';

const MQTTComponent = () => {
  const [sensorData, setSensorData] = useState(null); // Estado para almacenar los datos de los sensores

  useEffect(() => {
    const client = mqtt.connect('mqtt://172.21.128.1:8083/mqtt'); // Reemplaza con la URL de tu servidor MQTT

    // Evento de conexión exitosa
    client.on('connect', () => {
      console.log('Conectado al servidor MQTT');

      // Suscribirse al tema 'sensor1' para recibir datos
      client.subscribe('sensor1', (err) => {
        if (!err) {
          console.log('Suscripción exitosa al tema sensor1');
        } else {
          console.log('Error al suscribirse al tema sensor1:', err);
        }
      });
    });

    // Manejar los mensajes MQTT recibidos
    client.on('message', (topic, message) => {
      // Verificar que el mensaje corresponde al tema 'sensor1'
      if (topic === 'sensor1') {
        const jsonData = JSON.parse(message.toString());
        console.log('Datos de sensores recibidos:', jsonData);

        // Actualizar el estado con los datos de los sensores
        setSensorData(jsonData);
      }
    });

    // Cerrar la conexión al desmontar el componente
    return () => {
      client.end(); // Cerrar la conexión MQTT
    };
  }, []); // Se ejecuta solo una vez al montar el componente

  return (
    <div>
      <h2>Últimas Lecturas de Sensores</h2>
      {sensorData && (
        <ul>
          <li>Temperatura: {sensorData.temperatura} °C</li>
          <li>Humedad: {sensorData.humedad} %</li>
          <li>Nivel de Humo: {sensorData.humo}</li>
          <li>Velocidad de Viento: {sensorData.viento} km/h</li>
        </ul>
      )}
    </div>
  );
};

export default MQTTComponent;
