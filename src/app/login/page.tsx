/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState } from "react"
import { auth } from "../auth/auth"
import { useRouter } from 'next/navigation'

export default function Home() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);  
    const router = useRouter()

    const [data, setData] = useState<{
        email: string,
        password: string
    }>({
        email: '',
        password: ''
    })

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setData((prev: any) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        setError(null);  
        setLoading(true);

        try {
            const success = await auth({ email: data.email, password: data.password });
            if (success) {
                router.refresh();
            } else {
                setError('Usuário ou senha incorretos');
            }
        } catch (error) {
            console.error('Erro ao entrar:', error);
            setError('Erro ao tentar fazer login. Tente novamente.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="h-screen flex justify-center items-center bg-[#A57C59]">
            <div className="w-[400px] bg-white p-6 shadow-lg rounded-md">
                <div className="mb-4">
                    <h1 className="mb-8 text-black font-bold text-center">Entrar</h1>
                    <label htmlFor="email" className="block text-sm font-medium text-black">Email:</label>
                    <input
                        type="text"
                        name="email"
                        value={data?.email}
                        onChange={handleChange}
                        className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-black">Senha:</label>
                    <input
                        type="password"
                        name="password"
                        value={data?.password}
                        onChange={handleChange}
                        className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    />
                </div>
                {error && (
                    <div className="mb-4 text-red-500 text-sm">
                        {error}
                    </div>
                )}
                <div>
                    <button
                        onClick={handleLogin}
                        className="w-full bg-[#B0B87A] text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </div>
            </div>
        </div>
    )
}
