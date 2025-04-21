'use client'

import React, { useState } from "react";
import { setProperty } from "../supabase/queries/setProperty";

const PropertyForm = () => {
    const [statusMessage, setStatusMessage] = useState('');
    const [statusMessageStyle, setStatusMessageStyle] = useState('');
    const [selectedCategoryForm, setSelectedCategoryForm] = useState(1);

    const [isFormOpen, setIsFormOpen] = useState(false);

    const zoneList = ["Zona 01", "Zona 02", "Zona 03", "Zona 04", "Zona 05", "Zona 06", "Zona 07", "Zona 08", "Zona 09"]

    const [selectedZone, setSelectedZone] = useState("");


    const toggleForm = () => {
        setIsFormOpen(!isFormOpen);
    };

    const closeForm = () => {
        setIsFormOpen(false);
    };

    const handleCategorySelectForm = (category) => {
        setSelectedCategoryForm(category);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            street: e.target[0].value,
            number: e.target[1].value,
            neighborhood: e.target[2].value,
            zone: selectedZone,
            category: selectedCategoryForm,
        };

        if (!data.street || !data.number || !data.neighborhood || !data.zone || !data.category) {
            setStatusMessage('Todos os campos são obrigatórios');
            setStatusMessageStyle('text-red-500');
            return;
        }

        const property = {
            address: {
                street: data.street,
                number: data.number,
                neighborhood: data.neighborhood,
            },
            zone: data.zone,
            category: data.category,
        };

        const result = await setProperty(property);
        if (result) {
            setStatusMessage('Cadastro concluído com sucesso!');
            setStatusMessageStyle('text-green-500');
            e.target.reset();
        } else {
            setStatusMessage('Erro ao cadastrar a propriedade');
            setStatusMessageStyle('text-red-500');
        }
    };

    return (
        <div>
            {/* Botão para abrir o formulário */}
            {!isFormOpen && (
                <button onClick={toggleForm} className="bg-blue-500 text-white py-2 px-6 rounded-full mt-4">
                    Abrir Formulário
                </button>
            )}

            {/* Formulário quando isFormOpen for true */}
            {isFormOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white p-10 rounded-lg w-[80%] max-w-4xl shadow-xl relative">
                        <button onClick={closeForm} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900">X</button>
                        <h3 className="text-black text-xl font-bold mb-4">Formulário de Cadastro</h3>
                        {statusMessage && (
                            <div className={`mb-4 ${statusMessageStyle}`}>
                                {statusMessage}
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <input type="text" placeholder="Rua" className="mb-4 p-2 border rounded w-full text-black" required />
                            <input type="text" placeholder="Número" className="mb-4 p-2 border rounded w-full text-black" required />
                            <input type="text" placeholder="Bairro" className="mb-4 p-2 border rounded w-full text-black" required />
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
                                <div onClick={() => handleCategorySelectForm(1)} className={`w-6 h-6 rounded-full bg-green-500 cursor-pointer ${selectedCategoryForm === 1 ? 'ring-2 ring-black brightness-90' : ''}`} />
                                <div onClick={() => handleCategorySelectForm(2)} className={`w-6 h-6 rounded-full bg-yellow-500 cursor-pointer ${selectedCategoryForm === 2 ? 'ring-2 ring-black brightness-90' : ''}`} />
                                <div onClick={() => handleCategorySelectForm(3)} className={`w-6 h-6 rounded-full bg-red-500 cursor-pointer ${selectedCategoryForm === 3 ? 'ring-2 ring-black brightness-90' : ''}`} />
                            </div>
                            <button type="submit" className="w-[12%] bg-blue-500 text-white p-2 rounded-full">Cadastrar</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PropertyForm;
