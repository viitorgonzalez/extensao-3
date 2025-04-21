/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Auth from "../auth/auth"  // Importando o componente de autenticação

export default function Home() {
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

    return (
        <div className="h-screen flex justify-center items-center">
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
                <div>
                    {/* Passando a função de autenticação como prop */}
                    <Auth email={data.email} password={data.password} />
                </div>
            </div>
        </div>
    )
}
