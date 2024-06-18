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

    const promises = codes.map((code, index) => 
      axios.get(`http://api.fipeapi.com.br/v1/fipe/${code}/${yearList[index]}?apikey=YOUR_API_KEY`)
    );

    try {
      const responses = await Promise.all(promises);
      const data = responses.map(response => response.data);
      setResults(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const jsonToCSV = (json) => {
    const keys = Object.keys(json[0]);
    const csvRows = [keys.join(',')];

    json.forEach(obj => {
      const values = keys.map(key => {
        const escaped = ('' + obj[key]).replace(/"/g, '\\"');
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
    <div>
      <h1>Lista Fipe</h1>
      <input
        type="text"
        id='fipe_input'
        placeholder="Código Fipe"
        value={fipeCodes}
        onChange={handleFipeChange}
      />
      <input
        type="text"
        id='ano_input'
        placeholder="Ano modelo"
        value={years}
        onChange={handleYearChange}
      />
      <button id='search_button' onClick={handleSearch}>Search</button>
      <button id='csv_button' onClick={handleDownloadCSV}>Download CSV</button>
      <div>
        {results.map((result, index) => (
          <div key={index}>
            <h2>{result.name}</h2>
            <p>{result.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FipeSearch;
