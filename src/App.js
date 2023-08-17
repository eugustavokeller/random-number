import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [randomNumber, setRandomNumber] = useState(null);

  const fetchRandomNumber = async () => {
    try {
      const response = await fetch('http://localhost:8000/api.php/random-number');
      const data = await response.json();
      setRandomNumber(data.number);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const saveNumber = () => {
    if (randomNumber !== null) {
      const blob = new Blob([randomNumber], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'randomNumber.txt';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const getColor = () => {
    if (randomNumber >= 0 && randomNumber <= 50) {
      return 'green';
    } else if (randomNumber >= 51 && randomNumber <= 70) {
      return 'yellow';
    } else if (randomNumber >= 71 && randomNumber <= 100) {
      return 'red';
    } else {
      return 'black';
    }
  };

  return (
    <div className="App">
      <h1>Número Aleatório App</h1>
      <p>Esse é um app que busca um número aleatório de uma API com backend PHP e salva em um arquivo de texto.</p>
      <button onClick={fetchRandomNumber}>Buscar Número</button>
      <button onClick={saveNumber} disabled={randomNumber === null}>Salvar Número</button>
      {randomNumber !== null && (
        <p style={{ color: getColor() }}>Número: {randomNumber}</p>
      )}
    </div>
  );
}
