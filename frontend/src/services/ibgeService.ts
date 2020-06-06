import axios from 'axios';

const getUFs = async () => {
    return axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');
};

const getCities = async (uf: string) => {
    return axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
};

export { getUFs, getCities };

