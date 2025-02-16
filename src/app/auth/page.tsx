/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState } from "react";
import { supabase } from "../../supabase/config";

export default function Home() {
    const [data, setData] = useState<{
        email: string,
        password: string
    }>({
        email: '',
        password: ''
    });

    const auth = async () => {
        try {
            const { data, error } = await supabase
                .auth
                .signInWithPassword({
                    email: 'pimenta@gmail.com',
                    password: 'pimenta'
                });

            if (data) console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setData((prev: any) => ({
            ...prev,
            [name]: value,
        }));
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="w-[400px] bg-white p-6 shadow-lg rounded-md">
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="text"
                        name="email"
                        value={data?.email}
                        onChange={handleChange}
                        className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={data?.password}
                        onChange={handleChange}
                        className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <button 
                        onClick={auth} 
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}
