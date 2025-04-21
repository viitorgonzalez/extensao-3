'use client'

import React from "react";
import Footer from "../../components/Footer";
import PropertyForm from "../../components/PropertyForm";
import PropertyList from "../../components/PropertyList";
import GraphicSection from "../../components/GraphicSection";
import Header from "../../components/Header";

export default function Dashboard() {
    return (
        <div className="p-4 flex flex-col justify-between bg-white h-screen overflow-auto">
            <Header />

            <div className="bg-[#FAF0E6] rounded-2xl p-6 shadow-lg w-full grid grid-cols-2 gap-4 mx-auto">
                {/* Coluna da esquerda (50%) */}
                <div className="h-full">
                    <GraphicSection />
                </div>

                {/* Coluna da direita com 2 seções */}
                <div className="h-full grid grid-rows-2 gap-4">
                    <div className="bg-white rounded-xl p-4 shadow h-full overflow-auto">
                        <PropertyList />
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow h-full overflow-auto">
                        <PropertyForm />
                    </div>
                </div>
            </div>

            <div className="p-4 mt-[2%] flex justify-center items-center">
                <Footer />
            </div>
        </div>
    );
}
