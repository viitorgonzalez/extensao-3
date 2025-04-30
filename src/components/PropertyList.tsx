'use client'

import React, { useState } from "react";
import { getPropertiesList } from "../supabase/queries/getPropertiesList";
import { deleteProperty } from "../supabase/queries/deleteProperty";
import { updateProperty } from "../supabase/queries/updateProperty";
import { Property } from "../supabase/models/Property";
import EditPropertyCard from "./EditPropertyCard";

const PropertyList = () => {
    const [statusMessage, setStatusMessage] = useState('');
    const [statusMessageStyle, setStatusMessageStyle] = useState('');
    const [selectedCategoryList, setSelectedCategoryList] = useState<number>(1);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [propertyToEdit, setPropertyToEdit] = useState<Property | null>(null);

    // Estados para os campos de filtro
    const [street, setStreet] = useState("");
    const [number, setNumber] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [selectedZone, setSelectedZone] = useState("");

    const zoneList = ["Todas", "Zona 01", "Zona 02", "Zona 03", "Zona 04", "Zona 05", "Zona 06", "Zona 07", "Zona 08", "Zona 09"];

    const handleCloseResults = () => {
        setFilteredProperties([]);
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
            const properties = await getPropertiesList(filterParams);

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
            setStatusMessageStyle('text-black font-bold');
        } catch (error) {
            console.error("Error fetching properties:", error);
            setStatusMessage('Erro ao buscar propriedades');
            setStatusMessageStyle('text-red-500');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (propertyId: number) => {
        try {
            setIsLoading(true);

            // Chama a função deleteProperty
            const result = await deleteProperty(propertyId);

            if (result.success) {
                // Atualiza o status da UI com a mensagem de sucesso
                setStatusMessage(result.message);
                setStatusMessageStyle('text-green-500');

                // Atualiza a lista de propriedades removendo a propriedade deletada
                setFilteredProperties(filteredProperties.filter(property => property.id !== propertyId));
            } else {
                setStatusMessage(result.message);
                setStatusMessageStyle('text-red-500');
            }
        } catch (error) {
            console.error('Erro inesperado ao deletar propriedade:', error);
            setStatusMessage('Erro inesperado ao deletar propriedade');
            setStatusMessageStyle('text-red-500');
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdate = async (property: Property) => {
        try {
            setIsLoading(true);

            const result = await updateProperty(property);

            if (result.success) {
                setStatusMessage('Propriedade atualizada com sucesso');
                setPropertyToEdit(null);
                setStatusMessageStyle('text-green-500 font-bold h-10 text-center text-lg p-1');
                setTimeout(() => {
                    setStatusMessage('');
                    setStatusMessageStyle('');
                }, 3000);
            }

        } catch (error) {
            console.error("Erro ao editar card: ", error);
        } finally {
            setIsLoading(false);
        }
    };
    const handleEditClick = (property) => {
        setPropertyToEdit(property);
        handleCloseResults();
    };

    return (
        <div>

            {propertyToEdit && (
                <EditPropertyCard
                    property={propertyToEdit}
                    onClose={() => setPropertyToEdit(null)}
                    onSave={handleUpdate}
                />
            )}
            <h3 className="text-black text-xl font-bold mb-4">Pesquisar</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
                <input
                    type="text"
                    placeholder="Rua"
                    className="p-2 border rounded w-full text-black"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Número"
                    className="p-2 border rounded w-full text-black"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Bairro"
                    className="p-2 border rounded w-full text-black"
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                />
                <select
                    value={selectedZone}
                    onChange={(e) => setSelectedZone(e.target.value)}
                    className="p-2 border rounded w-full text-black"
                >
                    {zoneList.map((zone, index) => (
                        <option key={index} value={zone}>{zone}</option>
                    ))}
                </select>

                <div className="flex gap-2">
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
                    className="bg-[#B0B87A] text-white p-2 rounded-full"
                    disabled={isLoading}
                >
                    {isLoading ? 'Buscando...' : 'Filtrar'}
                </button>
            </form>


            {/* Exibição dos resultados */}
            {filteredProperties.length > 0 && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
                    <div className="bg-[#A57C59] p-8 rounded-lg relative w-1/3">
                        {statusMessage && (
                            <div className={`mb-4 ${statusMessageStyle}`}>
                                {statusMessage}
                            </div>
                        )}
                        <button
                            onClick={handleCloseResults}
                            className="absolute top-0 right-2 text-white font-bold text-xl">x</button>
                        <ul className="space-y-4 max-h-[700px] overflow-y-auto pr-2 scroll-slim">
                            <h4 className="font-bold mb-2 text-black">Resultados:</h4>
                            {filteredProperties.map((property, index) => (
                                <li
                                    key={index}
                                    className={`p-4 rounded-lg shadow-sm border transition duration-200 flex justify-between items-center ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}`}
                                >
                                    <div className="flex flex-col justify-between items-start w-[50%]">
                                        <p className="text-black">
                                            <strong className="font-semibold">Endereço:</strong> {property.address?.street}, {property.address?.number}
                                        </p>
                                        <p className="text-black">
                                            <strong className="font-semibold">Bairro:</strong> {property.address?.neighborhood}
                                        </p>
                                        <p className="text-black">
                                            <strong className="font-semibold">Zona:</strong> {property.zone}
                                        </p>
                                        <div className="text-black">
                                            <strong className="font-semibold">Categoria: </strong>
                                            <div
                                                className={`w-4 h-4 rounded-full inline-block align-middle ${property.category === 1
                                                    ? 'bg-green-500'
                                                    : property.category === 2
                                                        ? 'bg-yellow-500'
                                                        : 'bg-red-500'
                                                    }`}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-2 items-end">
                                        <button onClick={() => handleEditClick(property)}>
                                            ✏️
                                        </button>
                                        <button
                                            onClick={() => handleDelete(property.id)}>
                                            🗑️
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PropertyList;
