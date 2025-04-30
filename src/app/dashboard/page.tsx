'use client'

import React from "react";
import Footer from "../../components/Footer";
import PropertyForm from "../../components/PropertyForm";
import PropertyList from "../../components/PropertyList";
import GraphicSection from "../../components/GraphicSection";
import Header from "../../components/Header";

export default function Dashboard() {
    return (
        <div className="flex flex-col justify-between bg-white h-screen overflow-auto p-4">
            <Header />

            <div className="bg-[#A57C59] rounded-2xl mt-4 shadow-lg w-full flex flex-col gap-4 mx-auto p-8  ">
                <div className="flex gap-4 w-full h-full">
                    <div className="w-1/2 flex items-stretch">
                        <div className="w-full bg-white rounded-xl p-4 shadow flex items-center justify-center">
                            <GraphicSection />
                        </div>
                    </div>

                    <div className="w-1/2 flex flex-col gap-4">
                        <div className="bg-white rounded-xl p-4 shadow h-1/2">
                            <PropertyList />
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow h-1/2">
                            <PropertyForm />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-[2%] flex justify-center items-center">
                <Footer />
            </div>
        </div>
    );
}
