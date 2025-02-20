/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState } from "react"
import { supabase } from "../../supabase/config"
import { useRouter } from "next/navigation"

export default function Home() {
    const [data, setData] = useState<{
        email: string,
        password: string
    }>({
        email: '',
        password: ''
    })

    const router = useRouter()

    const auth = async () => {
        try {
            const { data: dataUser, error } = await supabase
                .auth
                .signInWithPassword({
                    email: data.email,
                    password: data.password
                })

            if (dataUser) {
                router.push('/dashboard')
            }
        } catch (error) {
            console.error(error) 
        }
    }

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
                    <button 
                        onClick={auth} 
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Entrar
                    </button>
                </div>
            </div>
        </div>
    )
}
