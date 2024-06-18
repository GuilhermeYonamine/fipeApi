import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import api from '../services/api';

const TruckList = () => {
  const [truckBrands, setTruckBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [years, setYears] = useState([]);
  const [setSelectedYear] = useState(null);
  const [priceDetails, setPriceDetails] = useState(null);

  useEffect(() => {
    const fetchCarBrands = async () => {
      try {
        const response = await api.get('/caminhoes/marcas');
        setTruckBrands(response.data.map(brand => ({ value: brand.codigo, label: brand.nome })));
      } catch (error) {
        console.error('Erro ao buscar marcas de caminhões:', error);
      }
    };

    fetchCarBrands();
  }, []);

  const fetchModels = async (brandId) => {
    try {
      const response = await api.get(`/caminhoes/marcas/${brandId}/modelos`);
      setModels(response.data.modelos.map(model => ({ value: model.codigo, label: model.nome })));
    } catch (error) {
      console.error('Erro ao buscar modelos:', error);
    }
  };

  const fetchYears = async (brandId, modelId) => {
    try {
      const response = await api.get(`/caminhoes/marcas/${brandId}/modelos/${modelId}/anos`);
      setYears(response.data.map(year => ({ value: year.codigo, label: year.nome })));
    } catch (error) {
      console.error('Erro ao buscar anos:', error);
    }
  };

  const fetchPrice = async (brandId, modelId, year) => {
    try {
      const response = await api.get(`/caminhoes/marcas/${brandId}/modelos/${modelId}/anos/${year}`);
      setPriceDetails(response.data);
    } catch (error) {
      console.error('Erro ao buscar preço:', error);
    }
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: '8px',
      borderColor: '#50a1ca',
      boxShadow: 'none',
      width: '300px', // Define a largura do select
      minHeight: '35px', // Define a altura mínima do select
      '&:hover': {
        borderColor: '#50a1ca',
      },
      margin: '0 auto', // Centraliza o select
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: '0 8px',
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      display: 'none', // Remove a seta de seleção
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#e0f7fa' : 'white',
      color: state.isSelected ? '#50a1ca' : 'black',
      '&:hover': {
        backgroundColor: '#50a1ca',
      },
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '8px',
      borderColor: '#50a1ca',
    }),
  };

  return (
    <div className="list-container">
      <h2>Marca do caminhão</h2>
      <Select
        options={truckBrands}
        onChange={(selectedOption) => {
          setSelectedBrand(selectedOption.value);
          fetchModels(selectedOption.value);
        }}
        placeholder="Selecione uma marca"
        styles={customStyles}
      />

      {selectedBrand && (
        <div>
          <h3>Modelo</h3>
          <Select
            options={models}
            onChange={(selectedOption) => {
              setSelectedModel(selectedOption.value);
              fetchYears(selectedBrand, selectedOption.value);
            }}
            placeholder="Selecione um modelo"
            styles={customStyles}
          />
        </div>
      )}

      {selectedModel && (
        <div>
          <h3>Ano</h3>
          <Select
            options={years}
            onChange={(selectedOption) => {
              setSelectedYear(selectedOption.value);
              fetchPrice(selectedBrand, selectedModel, selectedOption.value);
            }}
            placeholder="Selecione um ano"
            styles={customStyles}
          />
        </div>
      )}

      {priceDetails && (
        <div className='resultado_fipe'>
          <h2>Preço e Código FIPE</h2>
          <p>Preço: {priceDetails.Valor}</p>
          <p>Código FIPE: {priceDetails.CodigoFipe}</p>
        </div>
      )}
    </div>
  );
};

export default TruckList;
