'use client'

import React, { useState } from "react";
import { setProperty } from "../supabase/queries/setProperty";

const PropertyForm = () => {
    const [statusMessage, setStatusMessage] = useState('');
    const [statusMessageStyle, setStatusMessageStyle] = useState('');
    const [selectedCategoryForm, setSelectedCategoryForm] = useState(1);
    const [selectedZone, setSelectedZone] = useState("Zona 01");

    //const [formSubmitted, setFormSubmitted] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const zoneList = ["Zona 01", "Zona 02", "Zona 03", "Zona 04", "Zona 05", "Zona 06", "Zona 07", "Zona 08", "Zona 09"];

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
            setShowSuccessModal(true);
            setStatusMessage('');
            e.target.reset();
            setTimeout(() => {
                //setFormSubmitted(false);
                setShowSuccessModal(false);
            }, 3000);
        } else {
            setStatusMessage('Erro ao cadastrar a propriedade');
            setStatusMessageStyle('text-red-500');
        }
    };

    return (
        <div>
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

                <select
                    value={selectedZone}
                    onChange={(e) => setSelectedZone(e.target.value)}
                    className="mb-4 p-2 border rounded w-full text-black"
                >
                    {zoneList.map((zone, index) => (
                        <option key={index} value={zone}>{zone}</option>
                    ))}
                </select>

                <div className="flex gap-2 p-4 items-center">
                    <h3 className="text-black">Categoria:</h3>
                    <div onClick={() => handleCategorySelectForm(1)} className={`w-6 h-6 rounded-full bg-green-500 cursor-pointer ${selectedCategoryForm === 1 ? 'ring-2 ring-black brightness-90' : ''}`} />
                    <div onClick={() => handleCategorySelectForm(2)} className={`w-6 h-6 rounded-full bg-yellow-500 cursor-pointer ${selectedCategoryForm === 2 ? 'ring-2 ring-black brightness-90' : ''}`} />
                    <div onClick={() => handleCategorySelectForm(3)} className={`w-6 h-6 rounded-full bg-red-500 cursor-pointer ${selectedCategoryForm === 3 ? 'ring-2 ring-black brightness-90' : ''}`} />
                </div>

                <button type="submit" className="bg-[#B0B87A] text-white p-2 rounded-full">Cadastrar</button>
            </form>

            {/* Modal de sucesso */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <p className="text-black text-lg font-bold mb-4">Cadastro concluído com sucesso!</p>
                        <button
                            onClick={() => setShowSuccessModal(false)}
                            className="bg-[#B0B87A] text-white px-4 py-2 rounded-full"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PropertyForm;
