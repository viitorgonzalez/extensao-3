'use client';

import React, { useState } from 'react';
import { Property } from '../supabase/models/Property';

type Props = {
    property: Property;
    onClose: () => void;
    onSave: (updatedProperty: Property) => void;
};

const EditPropertyCard: React.FC<Props> = ({ property, onClose, onSave }) => {
    const [street, setStreet] = useState(property.address?.street || '');
    const [number, setNumber] = useState(property.address?.number || '');
    const [neighborhood, setNeighborhood] = useState(property.address?.neighborhood || '');
    const [zone, setZone] = useState(property.zone || '');
    const [category, setCategory] = useState(property.category || 1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const updatedProperty: Property = {
            ...property,
            address: {
                ...property.address,
                street,
                number,
                neighborhood,
            },
            zone,
            category,
        };

        onSave(updatedProperty);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full relative">
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-600 hover:text-black">X</button>
                <h2 className="text-lg font-semibold mb-4 text-black">Editar Propriedade</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        placeholder="Rua"
                        className="w-full p-2 border rounded text-black"
                    />
                    <input
                        type="text"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        placeholder="Número"
                        className="w-full p-2 border rounded text-black"
                    />
                    <input
                        type="text"
                        value={neighborhood}
                        onChange={(e) => setNeighborhood(e.target.value)}
                        placeholder="Bairro"
                        className="w-full p-2 border rounded text-black"
                    />
                    <input
                        type="text"
                        value={zone}
                        onChange={(e) => setZone(e.target.value)}
                        placeholder="Zona"
                        className="w-full p-2 border rounded text-black"
                    />
                    <div className="flex items-center gap-3">
                        <label className="text-black">Categoria:</label>
                        {[1, 2, 3].map((cat) => (
                            <div
                                key={cat}
                                onClick={() => setCategory(cat)}
                                className={`w-6 h-6 rounded-full cursor-pointer ${cat === 1 ? 'bg-green-500' : cat === 2 ? 'bg-yellow-500' : 'bg-red-500'} ${category === cat ? 'ring-2 ring-black brightness-90' : ''}`}
                            />
                        ))}
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-full">Salvar</button>
                </form>
            </div>
        </div>
    );
};

export default EditPropertyCard;
