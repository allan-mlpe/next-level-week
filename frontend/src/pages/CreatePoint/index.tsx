import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

import './styles.css';
import logo from '../../assets/logo.svg';

import api from '../../services/api';
import { getUFs, getCities } from '../../services/ibgeService';

interface Item {
    id: number;
    title: string;
    image: string;
}

interface UF {
    id: number;
    name: string;
    initials: string;
}

interface City {
    id: number;
    name: string;
}

const CreatePoint = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [ufs, setUfs] = useState<UF[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: ''
    });
    const history = useHistory();

    // selected values
    const [selectedUf, setSelectedUf] = useState<string>('0');
    const [selectedCity, setSelectedCity] = useState<string>();
    const [initialCoords, setInitialsCoords] = useState<[number, number]>([-8.055283,-34.878128]);
    const [selectedCoords, setSelectedCoords] = useState<[number, number]>([0,0]);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);


    const loadItems = async () => {
        const itemsResponse = await api.get('/items');

        setItems(itemsResponse.data);
    }

    const loadUFs = async () => {
        const ufs = await getUFs();

        const mappedUfs = ufs.data.map((uf:any) => {
            return {
                id: uf.id,
                name: uf.nome,
                initials: uf.sigla
            }
        });

        setUfs(mappedUfs);
    }

    const loadCities = async () => {
        const cities = await getCities(selectedUf);

        const mappedCities = cities.data.map((city: any) => {
            return {
                id: city.id,
                name: city.nome
            }
        });

        setCities(mappedCities);
    }

    // carrega localização atual do usuário
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;

            setInitialsCoords([latitude, longitude]);
        })
    }, []);

    // carrega os itens ao montar o componente
    useEffect(() => {
        loadItems()
    }, []);

    // carrega os itens de UF
    useEffect(() => {
        loadUFs()
    }, []);

    // carrega os munincípios sempre que `selectedUf` mudar 
    useEffect(() => {
        if (selectedUf !== '0') {
            loadCities();
        } else {
            setCities([]);
        }
    }, [selectedUf]);


    // Handlers
    const handleSelectUf = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedUf(event.target.value);
    }

    const handleSelectCity = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedCity(event.target.value);
    }

    const handleMapClick = (e: LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;

        setSelectedCoords([lat, lng]);
    }

    const handleSelectedItems = (itemId: number) => {
        const index = selectedItems.indexOf(itemId);

        const items =  index >= 0 ? selectedItems.filter(i => i !== itemId) 
            : [...selectedItems, itemId];

        setSelectedItems(items);
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        
        const { name, email, whatsapp } = formData;
        const uf = selectedUf;
        const city = selectedCity;
        const [latitude, longitude] = selectedCoords;
        const items = selectedItems;

        const point = {
            name,
            email,
            whatsapp,
            uf,
            city,
            latitude,
            longitude,
            items
        };

        
        const response = await api.post('/points', point);
        const storedPoint = response.data;

        alert(`Ponto de coleta '${storedPoint.id}' cadastrado com sucesso!`);

        history.push('/');
    }

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta"/>

                <Link to="/">
                    <FiArrowLeft />
                    Voltar para home
                </Link>
            </header>

            <form onSubmit={handleSubmit}>
                <h1>Cadastro do <br/> ponto de coleta</h1>

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Nome</label>
                        <input 
                            type="text"
                            name="name"
                            id="name"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input 
                                type="email"
                                name="email"
                                id="email"
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input 
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    <div id="map">
                        <Map center={initialCoords} zoom={15} onclick={handleMapClick}>
                            <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            <Marker position={selectedCoords} />
                        </Map>
                    </div>

                    <fieldset>
                        <div className="field-group">
                            <div className="field">
                                <label htmlFor="uf">Estado (UF)</label>
                                <select 
                                    name="uf" 
                                    id="uf"
                                    onChange={handleSelectUf}
                                    value={selectedUf}
                                >
                                    <option value="0">Selecione uma UF</option>
                                    {
                                        ufs.map((uf) => (
                                            <option 
                                                key={uf.id}
                                                value={uf.initials}
                                            >
                                                    {uf.initials} - {uf.name}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div className="field">
                                <label htmlFor="city">Cidade</label>
                                <select 
                                    name="uf" 
                                    id="uf"
                                    onChange={handleSelectCity}
                                    value={selectedCity}
                                >
                                    <option value="0">Selecione a cidade</option>
                                    {
                                        cities.map((city) => (
                                            <option 
                                                key={city.id}
                                                value={city.name}>
                                                    {city.name}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                    </fieldset>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Itens de coleta</h2>
                        <span>Selecione um ou mais itens abaixo</span>
                    </legend>

                    <ul className="items-grid">
                        {(
                            items.map((item, index) => (
                                <li 
                                    key={item.id}
                                    className={selectedItems.includes(item.id) ? 'selected' : ''}
                                    onClick={() => handleSelectedItems(item.id)}
                                >
                                        <img src={item.image} alt={item.title}/>
                                        <span>{item.title}</span>
                                </li>
                            ))
                        )}
                    </ul>
                </fieldset>

                <button type="submit">
                    Cadastrar ponto de coleta
                </button>
            </form>
        </div>
    );
}

export default CreatePoint;