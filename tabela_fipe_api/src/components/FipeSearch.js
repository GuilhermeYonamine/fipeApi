import React, { useState } from 'react';
import axios from 'axios';

const FipeSearch = () => {
  const [fipeCodes, setFipeCodes] = useState('');
  const [years, setYears] = useState('');
  const [results, setResults] = useState([]);

  const handleFipeChange = (e) => {
    let value = e.target.value;
    if (value.length > fipeCodes.length && value.length % 9 === 8) {
      value += ',';
    }
    setFipeCodes(value);
  };

  const handleYearChange = (e) => {
    let value = e.target.value;
    if (value.length > years.length && value.length % 5 === 4) {
      value += ',';
    }
    setYears(value);
  };

  const handleSearch = async () => {
    const codes = fipeCodes.split(',').filter(Boolean);
    const yearList = years.split(',').filter(Boolean);

    if (codes.length !== yearList.length) {
      alert('As listas de códigos FIPE e anos devem ter o mesmo comprimento.');
      return;
    }

    const apiKey = 'ec0a19b23c9bea966b3d2eac2106386e';
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    const promises = codes.map((code, index) => {
      const url = `${apiBaseUrl}/${code}/${yearList[index]}?apikey=${apiKey}`;
      return axios.get(url, { headers: { 'Cache-Control': 'no-cache' } }).catch((error) => {
        console.error(`Error fetching data for code ${code} and year ${yearList[index]}:`, error);
        return { data: null }; // Retornar null em caso de erro
      });
    });

    try {
      const responses = await Promise.all(promises);
      const data = responses.map(response => {
        if (response && response.data) {
          const { marca, modelo, ano, preco } = response.data;
          return { marca, modelo, ano, preco };
        } else {
          return { marca: 'N/A', modelo: 'N/A', ano: 'N/A', preco: 'N/A' };
        }
      });

      setResults(data);
    } catch (error) {
      console.error('Error processing data:', error);
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
        const value = obj[key] !== undefined ? obj[key] : '';
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
      <h2>Lista Fipe</h2>
      <input
        type="text"
        id='fipe_input'
        placeholder="Código Fipe"
        value={fipeCodes}
        onChange={handleFipeChange}
        className="input-field"
      />
      <input
        type="text"
        id='ano_input'
        placeholder="Ano modelo"
        value={years}
        onChange={handleYearChange}
        className="input-field"
      />
      <button id='search_button' onClick={handleSearch} className="action-button">Buscar</button>
      <button id='csv_button' onClick={handleDownloadCSV} className="action-button">Baixar csv</button>
      <div className="results-container">
        {results.map((result, index) => (
          <div key={index} className="result-item">
            <p>{result.modelo}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FipeSearch;
