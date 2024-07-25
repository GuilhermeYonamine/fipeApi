import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Consulta = () => {
  const [results, setResults] = useState([]);
  const apiKey = 'd910a2e8e8390df63996151259d680cc';
  const apiBaseUrl = 'https://wdapi2.com.br/saldo';

  const handleSearch = async () => {
    const url = `${apiBaseUrl}/${apiKey}`;
    console.log(`Making request to: ${url}`);

    try {
      const response = await axios.get(url, { headers: { 'Cache-Control': 'no-cache' } });
      const data = response.data;

      if (!data || data.length === 0) {
        alert('Nenhum resultado encontrado para a(s) busca(s) realizada(s).');
      } else {
        setResults([data]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Erro ao buscar os dados.');
    }
  };

  useEffect(() => {
    console.log('API Base URL:', apiBaseUrl);
  }, [apiBaseUrl]);

  return (
    <div className="list-container-fipe">
      <h2>Consultas</h2>
      <button onClick={handleSearch} className='consulta_button'>Buscar</button>
      <div className="results-container">
        {results.map((result, index) => (
          <div key={index} className="result-item">
            <p>Quantidade de Consultas: {result.qtdConsultas}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Consulta;
