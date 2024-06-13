// src/components/FipeSearch.js
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

  return (
    <div>
      <h1>FIPE Search</h1>
      <input
        type="text"
        placeholder="Enter FIPE codes, separated by commas"
        value={fipeCodes}
        onChange={handleFipeChange}
      />
      <input
        type="text"
        placeholder="Enter corresponding years, separated by commas"
        value={years}
        onChange={handleYearChange}
      />
      <button onClick={handleSearch}>Search</button>
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
