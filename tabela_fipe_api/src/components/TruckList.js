import React, { useState, useEffect } from 'react';
import api from '../services/api';

const TruckList = () => {
  const [carBrands, setCarBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const fetchCarBrands = async () => {
      try {
        const response = await api.get('/caminhoes/marcas');
        setCarBrands(response.data);
      } catch (error) {
        console.error('Erro ao buscar marcas de caminhoes:', error);
      }
    };

    fetchCarBrands();
  }, []);

  const fetchModels = async (brandId) => {
    try {
      const response = await api.get(`/caminhoes/marcas/${brandId}/modelos`);
      setModels(response.data.modelos);
    } catch (error) {
      console.error('Erro ao buscar modelos:', error);
    }
  };

  const fetchYears = async (brandId, modelId) => {
    try {
      const response = await api.get(`/caminhoes/marcas/${brandId}/modelos/${modelId}/anos`);
      setYears(response.data);
    } catch (error) {
      console.error('Erro ao buscar anos:', error);
    }
  };

  const fetchPrice = async (brandId, modelId, year) => {
    try {
      const response = await api.get(`/caminhoes/marcas/${brandId}/modelos/${modelId}/anos/${year}`);
      setPrice(response.data);
    } catch (error) {
      console.error('Erro ao buscar preço:', error);
    }
  };

  return (
    <div>
      <h1>Marcas de caminhoes</h1>
      <select onChange={(e) => { setSelectedBrand(e.target.value); fetchModels(e.target.value); }}>
        <option value="">Selecione uma marca</option>
        {carBrands.map(brand => (
          <option key={brand.codigo} value={brand.codigo}>{brand.nome}</option>
        ))}
      </select>

      {selectedBrand && (
        <div>
          <h2>Modelos</h2>
          <select onChange={(e) => { setSelectedModel(e.target.value); fetchYears(selectedBrand, e.target.value); }}>
            <option value="">Selecione um modelo</option>
            {models.map(model => (
              <option key={model.codigo} value={model.codigo}>{model.nome}</option>
            ))}
          </select>
        </div>
      )}

      {selectedModel && (
        <div>
          <h2>Anos</h2>
          <select onChange={(e) => { setSelectedYear(e.target.value); fetchPrice(selectedBrand, selectedModel, e.target.value); }}>
            <option value="">Selecione um ano</option>
            {years.map(year => (
              <option key={year.codigo} value={year.codigo}>{year.nome}</option>
            ))}
          </select>
        </div>
      )}

      {price && (
        <div>
          <h2>Preço</h2>
          <p>{price.Valor}</p>
        </div>
      )}
    </div>
  );
};

export default TruckList;
