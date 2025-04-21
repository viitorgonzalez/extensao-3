'use client'

import React from "react";
import Footer from "../../components/Footer";
import PropertyForm from "../../components/PropertyForm";
import PropertyList from "../../components/PropertyList";
import GraphicSection from "../../components/GraphicSection";
import Header from "../../components/Header";

export default function Dashboard() {
    return (
        <div className="p-4 flex flex-col justify-between bg-[#E0FFFF] h-screen overflow-auto">
            <Header />
            <div className="flex justify-center h-full items-center">
            <GraphicSection />
            </div>
            <div className="flex justify-center items-center gap-x-8">
            <PropertyForm />
            <PropertyList />
            </div>
            <div className="p-4 mt-[10%] flex justify-center items-center">
            <Footer />
            </div>
        </div>
    );
}
