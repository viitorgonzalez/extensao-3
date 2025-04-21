'use client'

import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Property } from '../supabase/models/Property'
import { getProperties } from '../supabase/queries/getProperties'

const COLORS = {
    1: '#4CAF50', // verde
    2: '#FFC107', // amarelo
    3: '#F44336'  // vermelho
}

const normalizeZoneName = (zone: string | null): string => {
    if (!zone) return 'Sem zona'
    const cleaned = zone.replace(/^zona\s*/i, '').trim()
    const asNumber = parseInt(cleaned)
    if (!isNaN(asNumber)) return asNumber.toString()
    return zone
}

const GraphicSection = () => {
    const [properties, setProperties] = useState<Property[]>([])
    const [zoneData, setZoneData] = useState<Record<string, { category: number; count: number }[]>>({})

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProperties()
            setProperties(data)
        }
        fetchData()
    }, [])

    useEffect(() => {
        const grouped: Record<string, Record<number, number>> = {}

        for (let i = 1; i <= 9; i++) {
            grouped[i.toString()] = { 1: 0, 2: 0, 3: 0 }
        }

        properties.forEach((property) => {
            const zone = normalizeZoneName(property.zone)
            const category = property.category || 0

            if (!grouped[zone]) {
                grouped[zone] = { 1: 0, 2: 0, 3: 0 }
            }

            if (category >= 1 && category <= 3) {
                grouped[zone][category]++
            }
        })

        const parsed: Record<string, { category: number; count: number }[]> = {}
        Object.entries(grouped).forEach(([zone, catCounts]) => {
            parsed[zone] = [
                { category: 1, count: catCounts[1] || 0 },
                { category: 2, count: catCounts[2] || 0 },
                { category: 3, count: catCounts[3] || 0 }
            ]
        })

        setZoneData(parsed)
    }, [properties])

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="grid grid-cols-3 gap-4">
                {Array.from({ length: 9 }, (_, i) => i + 1).map((zoneNumber) => {
                    const zone = zoneNumber.toString()
                    const data = zoneData[zone] || [
                        { category: 1, count: 0 },
                        { category: 2, count: 0 },
                        { category: 3, count: 0 }
                    ]

                    return (
                        <div key={zone} className="bg-white rounded-lg shadow p-3">
                            <h2 className="text-md font-semibold mb-2 text-gray-700 text-center">
                                Zona {zone}
                            </h2>
                            <div className="h-[180px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={data}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                        <XAxis 
                                            dataKey="category" 
                                            tickFormatter={(tick) => `C${tick}`}
                                            tick={{ fontSize: 12 }}
                                        />
                                        <YAxis tick={{ fontSize: 10 }} />
                                        <Tooltip />
                                        <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                                            {data.map((entry) => (
                                                <Cell key={`cell-${entry.category}`} fill={COLORS[entry.category]} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default GraphicSection