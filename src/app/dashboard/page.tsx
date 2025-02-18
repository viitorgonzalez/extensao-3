'use client'

import React, { useState } from "react"
import { setProperty } from "../../supabase/queries/setProperty"

export default function Dashboard() {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [selectedZone, setSelectedZone] = useState("centro")
    const [selectedCategory, setSelectedCategory] = useState(1)
    const [colorsGraphic, setColorsGraphic] = useState({
        green: true,
        yellow: true,
        red: true
    })

    const [colorsList, setColorsList] = useState({
        green: true,
        yellow: true,
        red: true
    })

    const [statusMessage, setStatusMessage] = useState('')
    const [statusMessageStyle, setStatusMessageStyle] = useState('')

    const toggleForm = () => {
        setIsFormOpen(!isFormOpen)
    }

    const closeForm = () => {
        setIsFormOpen(false)
    }

    const handleColorToggleGraphic = (color) => {
        setColorsGraphic(prev => ({
            ...prev,
            [color]: !prev[color]
        }))
    }

    const handleCategorySelect = (category) => {
        setSelectedCategory(category)
    }

    const handleColorToggleList = (color) => {
        setColorsList(prev => ({
            ...prev,
            [color]: !prev[color]
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const category = selectedCategory

        const data = {
            street: e.target[0].value,
            number: e.target[1].value,
            neighborhood: e.target[2].value,
            zone: e.target[3].value,
            category: category,
        }

        if(!data.street || !data.number || !data.neighborhood || !data.zone || !data.category) {
            setStatusMessage('Todos os campos são obrigatórios');
            setStatusMessageStyle('text-red-500');
            return;
        }

        const property = {
            address: {
                street: data.street,
                number: data.number,
                neighborhood: data.neighborhood
            },
            zone: data.zone,
            category: data.category
        }

        const result = await setProperty(property);

        if (result) {
            setStatusMessage('Cadastro concluído com sucesso!')
            setStatusMessageStyle('text-green-500')
            e.target.reset();  
        } else {
            setStatusMessage('Erro ao cadastrar a propriedade')
            setStatusMessageStyle('text-red-500')
        }
    }

    return (
        <div className="flex flex-col bg-white h-screen">
            {/* Header */}
            <div className="flex bg-gray-400 m-4 h-[8%] rounded-lg">
                <div className="ml-4 px-6 py-2 flex items-center bg-gray-600 text-white rounded-full">Logo</div>
                <div className="ml-auto mr-4 px-4 py-1 flex items-center justify-center self-center bg-gray-600 rounded-full">Sair</div>
            </div>

            {/* Body */}
            <div className="flex flex-col bg-gray-200 m-4 flex-grow rounded-lg space-y-4">
                {/* Div para Gráficos */}
                <div className="flex flex-col items-center justify-center bg-blue-500 text-white w-full h-2/3 rounded-lg">
                    {/* Header de Filtros */}
                    <div className="flex w-full gap-x-4 p-4 bg-blue-600 rounded-t-lg">
                        <div className="flex gap-x-2 justify-center">
                            <h3 className="text-lg font-bold">Zona: </h3>
                            <select className="p-2 rounded-lg bg-white text-blue-600" value={selectedZone} onChange={(e) => setSelectedZone(e.target.value)}>
                                <option value="centro">Todas</option>
                                <option value="centro">Centro</option>
                                <option value="bairro1">Bairro 1</option>
                                <option value="bairro2">Bairro 2</option>
                            </select>
                        </div>
                        {/* Filtros de cor */}
                        <div className="mr-auto flex gap-x-2 justify-center">
                            <h3 className="text-lg font-bold">Categoria: </h3>
                            <div
                                onClick={() => handleColorToggleGraphic('green')}
                                className={`w-6 h-6 rounded-full ${colorsGraphic.green ? "bg-green-500" : "bg-gray-300"}`}
                            />
                            <div
                                onClick={() => handleColorToggleGraphic('yellow')}
                                className={`w-6 h-6 rounded-full ${colorsGraphic.yellow ? "bg-yellow-500" : "bg-gray-300"}`}
                            />
                            <div
                                onClick={() => handleColorToggleGraphic('red')}
                                className={`w-6 h-6 rounded-full ${colorsGraphic.red ? "bg-red-500" : "bg-gray-300"}`}
                            />
                        </div>
                    </div>

                    {/* Gráficos */}
                    <div className="flex items-center justify-center w-full h-full">
                        {/* Aqui ficará a lógica dos gráficos */}
                        Gráficos
                    </div>
                </div>

                {/* Div para Cadastrar Imóveis e Lista */}
                <div className="flex flex-col gap-y-4 items-center w-full bg-white rounded-lg shadow-lg p-4">
                    {/* Botão de Abrir Cadastro */}
                    <button onClick={toggleForm} className="px-4 py-2 bg-green-500 text-white rounded-full">Cadastrar Imóvel</button>

                    {/* Card de Cadastro */}
                    {isFormOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
                            <div className="bg-white p-10 rounded-lg w-[80%] max-w-4xl shadow-xl relative">
                                <button
                                    onClick={closeForm}
                                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                                >
                                    X
                                </button>
                                <h3 className="text-black text-xl font-bold mb-4">Formulário de Cadastro</h3>
                                
                                {/* Mensagem de status */}
                                {statusMessage && (
                                    <div className={`mb-4 ${statusMessageStyle}`}>
                                        {statusMessage}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    <input type="text" placeholder="Rua" className="mb-4 p-2 border rounded w-full text-black" />
                                    <input type="text" placeholder="Número" className="mb-4 p-2 border rounded w-full text-black" />
                                    <input type="text" placeholder="Bairro" className="mb-4 p-2 border rounded w-full text-black" />
                                    <input type="text" placeholder="Zona" className="mb-4 p-2 border rounded w-full text-black" />
                                    <div className="flex gap-2 p-4">
                                        <h3 className="text-black">Categoria:</h3>
                                        <div
                                            onClick={() => handleCategorySelect(1)}
                                            className={`w-6 h-6 rounded-full bg-green-500 cursor-pointer 
                                            ${selectedCategory === 1 ? 'ring-2 ring-black brightness-90' : ''}`}
                                        />
                                        <div
                                            onClick={() => handleCategorySelect(2)}
                                            className={`w-6 h-6 rounded-full bg-yellow-500 cursor-pointer 
                                            ${selectedCategory === 2 ? 'ring-2 ring-black brightness-90' : ''}`}
                                        />
                                        <div
                                            onClick={() => handleCategorySelect(3)}
                                            className={`w-6 h-6 rounded-full bg-red-500 cursor-pointer 
                                            ${selectedCategory === 3 ? 'ring-2 ring-black brightness-90' : ''}`}
                                        />
                                    </div>
                                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-full">Cadastrar</button>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Área de Pesquisa */}
                    <div className="flex gap-4 items-center w-full bg-gray-600 rounded-lg p-2">
                        {/* Zona */}
                        <h3 className="text-lg font-bold">Zona: </h3>
                        <select className="p-2 rounded bg-white text-blue-600" value={selectedZone} onChange={(e) => setSelectedZone(e.target.value)}>
                            <option value="centro">Todas</option>
                            <option value="centro">Centro</option>
                            <option value="bairro1">Bairro 1</option>
                            <option value="bairro2">Bairro 2</option>
                        </select>

                        {/* Categoria */}
                        <div className="flex gap-2">
                            <h3 className="text-lg font-bold">Categoria: </h3>
                            <div
                                onClick={() => handleColorToggleList('green')}
                                className={`w-6 h-6 rounded-full ${colorsList.green ? "bg-green-500" : "bg-gray-300"}`}
                            />
                            <div
                                onClick={() => handleColorToggleList('yellow')}
                                className={`w-6 h-6 rounded-full ${colorsList.yellow ? "bg-yellow-500" : "bg-gray-300"}`}
                            />
                            <div
                                onClick={() => handleColorToggleList('red')}
                                className={`w-6 h-6 rounded-full ${colorsList.red ? "bg-red-500" : "bg-gray-300"}`}
                            />
                        </div>

                        {/* Botão de Listar */}
                        <button className="ml-auto px-4 py-2 bg-blue-500 text-white rounded-full">
                            Listar
                        </button>
                    </div>

                    {/* Lista */}
                    <div className="bg-gray-400 p-4 rounded-lg shadow-md w-full">
                        <ul>
                            <li className={'bg-gray-800'}>endereço 0, 000, centro</li>
                            <li className={'bg-gray-600'}>endereço 1, 111, Bairro 1</li>
                            <li className={'bg-gray-800'}>endereço 2, 222, Bairro 2</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="flex bg-gray-600 text-white h-[10%] items-center justify-center rounded-lg m-4">
                <p>© 2025 Seu Site | Todos os direitos reservados</p>
            </div>
        </div>
    )
}
