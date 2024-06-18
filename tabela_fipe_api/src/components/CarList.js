import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import api from '../services/api';

const CarList = () => {
  const [carBrands, setCarBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [years, setYears] = useState([]);
  const [setSelectedYear] = useState(null);
  const [priceDetails, setPriceDetails] = useState(null);

  useEffect(() => {
    const fetchCarBrands = async () => {
      try {
        const response = await api.get('/carros/marcas');
        setCarBrands(response.data.map(brand => ({ value: brand.codigo, label: brand.nome })));
      } catch (error) {
        console.error('Erro ao buscar marcas de carros:', error);
      }
    };

    fetchCarBrands();
  }, []);

  const fetchModels = async (brandId) => {
    try {
      const response = await api.get(`/carros/marcas/${brandId}/modelos`);
      setModels(response.data.modelos.map(model => ({ value: model.codigo, label: model.nome })));
    } catch (error) {
      console.error('Erro ao buscar modelos:', error);
    }
  };

  const fetchYears = async (brandId, modelId) => {
    try {
      const response = await api.get(`/carros/marcas/${brandId}/modelos/${modelId}/anos`);
      setYears(response.data.map(year => ({ value: year.codigo, label: year.nome })));
    } catch (error) {
      console.error('Erro ao buscar anos:', error);
    }
  };

  const fetchPrice = async (brandId, modelId, year) => {
    try {
      const response = await api.get(`/carros/marcas/${brandId}/modelos/${modelId}/anos/${year}`);
      setPriceDetails(response.data);
    } catch (error) {
      console.error('Erro ao buscar preço:', error);
    }
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: '8px',
      borderColor: '#32657E',
      boxShadow: 'none',
      width: '300px', // Define a largura do select
      minHeight: '35px', // Define a altura mínima do select
      '&:hover': {
        borderColor: '#32657E',
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
      color: state.isSelected ? '#32657E' : 'black',
      '&:hover': {
        backgroundColor: '#32657E',
      },
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '8px',
      borderColor: '#32657E',
    }),
  };

  return (
    <div className="list-container">
      <h2>Marca do carro</h2>
      <Select
        options={carBrands}
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
          <h3>Preço e Código Fipe</h3>
          <p>Preço: {priceDetails.Valor}</p>
          <p>Código FIPE: {priceDetails.CodigoFipe}</p>
        </div>
      )}
    </div>
  );
};

export default CarList;
