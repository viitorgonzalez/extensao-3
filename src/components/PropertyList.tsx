'use client'

import React, { useState } from "react";
import { getPropertiesByZoneAndCategory } from "../supabase/queries/getPropertiesList";

const PropertyList = () => {
    const [statusMessage, setStatusMessage] = useState('');
    const [statusMessageStyle, setStatusMessageStyle] = useState('');
    const [selectedCategoryList, setSelectedCategoryList] = useState<number | null>(null);
    const [isListOpen, setIsListOpen] = useState(false);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Estados para os campos de filtro
    const [street, setStreet] = useState("");
    const [number, setNumber] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [selectedZone, setSelectedZone] = useState("");

    const zoneList = ["Todas", "Zona 01", "Zona 02", "Zona 03", "Zona 04", "Zona 05", "Zona 06", "Zona 07", "Zona 08", "Zona 09"];

    const toggleList = () => {
        setIsListOpen(!isListOpen);
    };

    const closeList = () => {
        setIsListOpen(false);
        setFilteredProperties([]);
        setStatusMessage('');
    };

    const handleCategorySelectList = (category: number) => {
        setSelectedCategoryList(category === selectedCategoryList ? null : category);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Criar objeto de filtro baseado nos campos preenchidos
            const filterParams = {
                zone: selectedZone || undefined,
                category: selectedCategoryList || undefined,
                // Adicionando campos de endereço para filtro local
                address: {
                    street,
                    number,
                    neighborhood
                }
            };

            // Buscar propriedades no Supabase
            const properties = await getPropertiesByZoneAndCategory(filterParams);

            // Filtro adicional local para campos de endereço
            const filtered = properties.filter(property => {
                return (
                    (street === "" || property.address?.street?.toLowerCase().includes(street.toLowerCase())) &&
                    (number === "" || property.address?.number?.toString().includes(number.toString())) &&
                    (neighborhood === "" || property.address?.neighborhood?.toLowerCase().includes(neighborhood.toLowerCase()))
                );
            });

            setFilteredProperties(filtered);
            setStatusMessage(`${filtered.length} propriedades encontradas`);
            setStatusMessageStyle('text-gray-500');
        } catch (error) {
            console.error("Error fetching properties:", error);
            setStatusMessage('Erro ao buscar propriedades');
            setStatusMessageStyle('text-red-500');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {/* Botão para abrir o formulário de filtro */}
            {!isListOpen && (
                <button onClick={toggleList} className="bg-blue-500 text-white py-2 px-6 rounded-full mt-4">
                    Filtrar Propriedades
                </button>
            )}

            {/* Formulário de filtro quando isListOpen for true */}
            {isListOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white p-10 rounded-lg w-[80%] max-w-4xl shadow-xl relative">
                        <button onClick={closeList} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900">X</button>
                        <h3 className="text-black text-xl font-bold mb-4">Filtrar Propriedades</h3>
                        {statusMessage && (
                            <div className={`mb-4 ${statusMessageStyle}`}>
                                {statusMessage}
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Rua"
                                className="mb-4 p-2 border rounded w-full text-black"
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Número"
                                className="mb-4 p-2 border rounded w-full text-black"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Bairro"
                                className="mb-4 p-2 border rounded w-full text-black"
                                value={neighborhood}
                                onChange={(e) => setNeighborhood(e.target.value)}
                            />

                            {/* Campo Zona como select */}
                            <select
                                value={selectedZone}
                                onChange={(e) => setSelectedZone(e.target.value)}
                                className="mb-4 p-2 border rounded w-full text-black"
                            >
                                {zoneList.map((zone, index) => (
                                    <option key={index} value={zone}>{zone}</option>
                                ))}
                            </select>

                            <div className="flex gap-2 p-4">
                                <h3 className="text-black">Categoria:</h3>
                                <div
                                    onClick={() => handleCategorySelectList(1)}
                                    className={`w-6 h-6 rounded-full bg-green-500 cursor-pointer ${selectedCategoryList === 1 ? 'ring-2 ring-black brightness-90' : ''}`}
                                    title="Categoria 1"
                                />
                                <div
                                    onClick={() => handleCategorySelectList(2)}
                                    className={`w-6 h-6 rounded-full bg-yellow-500 cursor-pointer ${selectedCategoryList === 2 ? 'ring-2 ring-black brightness-90' : ''}`}
                                    title="Categoria 2"
                                />
                                <div
                                    onClick={() => handleCategorySelectList(3)}
                                    className={`w-6 h-6 rounded-full bg-red-500 cursor-pointer ${selectedCategoryList === 3 ? 'ring-2 ring-black brightness-90' : ''}`}
                                    title="Categoria 3"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-[8%] bg-blue-500 text-white p-2 rounded-full"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Buscando...' : 'Filtrar'}
                            </button>
                        </form>

                        {/* Exibição dos resultados */}
                        {filteredProperties.length > 0 && (
                            <div className="mt-8 max-h-60 overflow-y-auto">
                                <h4 className="font-bold mb-2 text-black">Resultados:</h4>
                                <ul className="space-y-4">
                                    {filteredProperties.map((property, index) => (
                                        <li
                                            key={index}
                                            className={`p-4 rounded-lg shadow-sm border transition duration-200 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
                                                }`}
                                        >
                                            <p className="text-black">
                                                <strong className="font-semibold">Endereço:</strong> {property.address?.street}, {property.address?.number}
                                            </p>
                                            <p className="text-black">
                                                <strong className="font-semibold">Bairro:</strong> {property.address?.neighborhood}
                                            </p>
                                            <p className="text-black">
                                                <strong className="font-semibold">Zona:</strong> {property.zone}
                                            </p>
                                            <div className="mt-2">
                                                <span className="text-sm text-gray-600 mr-2">Categoria:</span>
                                                <div
                                                    className={`w-4 h-4 rounded-full inline-block align-middle ${property.category === 1
                                                        ? 'bg-green-500'
                                                        : property.category === 2
                                                            ? 'bg-yellow-500'
                                                            : 'bg-red-500'
                                                        }`}
                                                />
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PropertyList;