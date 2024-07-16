import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Placa = () => {
  const [fipeCodes, setFipeCodes] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    console.log('REACT_APP_API_BASE_URL:', process.env.REACT_APP_API_BASE_URL);
    console.log('REACT_APP_API_BASE_URL_PLACA:', process.env.REACT_APP_API_BASE_URL_PLACA);
  }, []);

  const handleFipeChange = (e) => {
    let value = e.target.value;
    if (value.length > fipeCodes.length && value.length % 8 === 7) {
      value += ',';
    }
    setFipeCodes(value);
  };

  const handleSearch = async () => {
    const codes = fipeCodes.split(',').filter(Boolean);

    const apiKey = 'd910a2e8e8390df63996151259d680cc';
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL_PLACA;

    console.log('API Base URL Placa:', apiBaseUrl);  // Log para verificar a URL base

    const promises = codes.map((code) => {
      const url = `${apiBaseUrl}/${code}/${apiKey}`;
      console.log(`Making request to: ${url}`);
      return axios.get(url, { headers: { 'Cache-Control': 'no-cache' } });
    });

    try {
      const responses = await Promise.all(promises);
      const data = responses.map(response => {
        // Verifica se a resposta contém os dados esperados
        const {
          ano = '',
          anoModelo ='',
          chassis = '',
          MARCA = '',
          MODELO = '',
          extra: { chassi = ''} = {},
          fipe: {
            dados: [{
              codigo_fipe = '',
              texto_valor = ''
            } = {}] = []
          } = {}
        } = response.data || {};

        return {
          MARCA,
          MODELO,
          ano,
          anoModelo,
          codigo_fipe,
          texto_valor,
          chassi,
          chassis
        };
      }).filter(item => item !== null); // Filtra respostas inválidas

      if (data.length === 0) {
        alert('Nenhum resultado encontrado para a(s) busca(s) realizada(s).');
      } else {
        setResults(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const jsonToCSV = (json) => {
    if (!json || json.length === 0) {
      return '';
    }

    const keys = Object.keys(json[0]);
    const csvRows = [keys.join(',')];

    json.forEach(obj => {
      const values = keys.map(key => {
        const value = obj[key] !== undefined ? obj[key] : ''; // Substitui valores não encontrados por vazio
        const escaped = ('' + value).replace(/"/g, '""');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(','));
    });

    return csvRows.join('\n');
  };

  const handleDownloadCSV = () => {
    const csv = jsonToCSV(results);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'fipe_results.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="list-container-fipe">
      <h2>Busca placa</h2>
      <input
        type="text"
        id='fipe_input'
        placeholder="Placa do veículo"
        value={fipeCodes}
        onChange={handleFipeChange}
        className="input-field"
      />
      <button id='search_button' onClick={handleSearch} className="action-button">Buscar</button>
      <button id='csv_button' onClick={handleDownloadCSV} className="action-button">Baixar csv</button>
      <div className="results-container">
        {results.map((result, index) => (
          <div key={index} className="result-item">
            <p>{result.codigo_fipe}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Placa;
