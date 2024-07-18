import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ConsultaUnitaria = () => {
    useEffect(() => {
        console.log('REACT_APP_API_BASE_URL_PLACA:', process.env.REACT_APP_API_BASE_URL_PLACA);
    }, []);

        const [placa, setPlaca] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handlePlacaChange = (e) => {
        setPlaca(e.target.value);
    };

    const handleSearch = async () => {
        setLoading(true);
        setError(null);

        const apiKey = 'd910a2e8e8390df63996151259d680cc';
        const apiBaseUrl = process.env.REACT_APP_API_BASE_URL_PLACA;

        try {
        const response = await axios.get(`${apiBaseUrl}/${placa}/${apiKey}`, {
            headers: { 'Cache-Control': 'no-cache' }
        });
        const data = response.data;

        const {
            ano = '',
            anoModelo = '',
            chassis = '',
            MARCA = '',
            MODELO = '',
            segmento = '',

            extra: { chassi = '', cilindradas = '', combustivel= '', eixos = ''} = {},
            fipe: {
            dados: [{
                codigo_fipe = '',
                texto_valor = ''
            } = {}] = []
            } = {}
        } = data || {};

        const resultData = {
            MARCA,
            MODELO,
            ano,
            anoModelo,
            codigo_fipe,
            texto_valor,
            chassi,
            chassis,
            segmento,
            cilindradas, 
            combustivel,
            eixos
        };

        setResult(resultData);
        } catch (error) {
        setError('Erro ao buscar dados da placa. Verifique se a placa está correta e tente novamente.');
        } finally {
        setLoading(false);
        }
    };

    const handleBack = () => {
        setResult(null);
        setPlaca('');
        setError(null);
    };

    return (
        <div className="placa-search-container">
        {result ? (
            <div className="details-container">
                <div className='details-container-results'>
                    <p><strong>Marca:</strong> {result.MARCA}</p>
                    <p><strong>Modelo:</strong> {result.MODELO}</p>
                    <p><strong>Ano:</strong> {result.ano}</p>
                    <p><strong>Ano do Modelo:</strong> {result.anoModelo}</p>
                    <p><strong>Chassis:</strong> {result.chassis}</p>
                    <p><strong>Chassi Extra:</strong> {result.chassi}</p>
                    <p><strong>Código FIPE:</strong> {result.codigo_fipe}</p>
                    <p><strong>Valor:</strong> {result.texto_valor}</p>
                    <p><strong>Segmento:</strong> {result.segmento}</p>
                    <p><strong>cilindradas:</strong> {result.cilindradas}</p>
                    <p><strong>combustivel:</strong> {result.combustivel}</p>
                    <p><strong>eixos:</strong> {result.eixos}</p>
                </div>
                <button onClick={handleBack}>Voltar</button>
            </div>
        ) : (
            <div className="search-container">
                <h2>Busca por Placa</h2>
                <input
                    type="text"
                    value={placa}
                    onChange={handlePlacaChange}
                    placeholder="Digite a placa do veículo"
                    className="input-field"
                />
                <button onClick={handleSearch} className="action-button" disabled={loading || !placa}>
                    {loading ? 'Buscando...' : 'Buscar'}
                </button>
                {error && <p className="error-message">{error}</p>}
            </div>
        )}
        </div>
    );
};

export default ConsultaUnitaria;