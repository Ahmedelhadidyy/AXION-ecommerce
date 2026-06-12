"use client";

import { useState } from "react";

import {
  tshirtGuide,
  shortsGuide,
  shoesGuide,
} from "@/data/products/sizeGuideData";

export default function SizeGuide() {
  const [activeTab, setActiveTab] = useState("tshirts");

  return (
    <div
      className="
      mt-8
      rounded-3xl
      border
      border-white/10
      bg-white/3
      p-6
      "
    >
      <h3 className="mb-6 text-2xl font-bold">Size Guide</h3>

      {/* Tabs */}

      <div className="mb-8 flex flex-wrap gap-3">
        <button
          aria-label="t-shirts"
          onClick={() => setActiveTab("tshirts")}
          className={`
          rounded-xl
          px-5
          py-3
          font-medium
          transition-all

          ${activeTab === "tshirts" ? "bg-primary text-black" : "bg-white/5"}
          `}
        >
          T-Shirts
        </button>

        <button
          aria-label="shorts"
          onClick={() => setActiveTab("shorts")}
          className={`
          rounded-xl
          px-5
          py-3
          font-medium
          transition-all

          ${activeTab === "shorts" ? "bg-primary text-black" : "bg-white/5"}
          `}
        >
          Shorts
        </button>

        <button
          aria-label="shoes"
          onClick={() => setActiveTab("shoes")}
          className={`
          rounded-xl
          px-5
          py-3
          font-medium
          transition-all

          ${activeTab === "shoes" ? "bg-primary text-black" : "bg-white/5"}
          `}
        >
          Shoes
        </button>
      </div>

      {/* T-Shirts */}

      {activeTab === "tshirts" && (
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full">
            <thead>
              <tr className="bg-white/5">
                <th className="p-4 text-left">Size</th>
                <th className="p-4 text-left">Chest</th>
                <th className="p-4 text-left">Waist</th>
              </tr>
            </thead>

            <tbody>
              {tshirtGuide.map((item) => (
                <tr key={item.size} className="border-t border-white/10">
                  <td className="p-4">{item.size}</td>

                  <td className="p-4">{item.chest}</td>

                  <td className="p-4">{item.waist}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Shorts */}

      {activeTab === "shorts" && (
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full">
            <thead>
              <tr className="bg-white/5">
                <th className="p-4 text-left">Size</th>

                <th className="p-4 text-left">Waist</th>

                <th className="p-4 text-left">Hip</th>
              </tr>
            </thead>

            <tbody>
              {shortsGuide.map((item) => (
                <tr key={item.size} className="border-t border-white/10">
                  <td className="p-4">{item.size}</td>

                  <td className="p-4">{item.waist}</td>

                  <td className="p-4">{item.hip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Shoes */}

      {activeTab === "shoes" && (
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full">
            <thead>
              <tr className="bg-white/5">
                <th className="p-4 text-left">EU</th>

                <th className="p-4 text-left">US</th>
              </tr>
            </thead>

            <tbody>
              {shoesGuide.map((item) => (
                <tr key={item.eu} className="border-t border-white/10">
                  <td className="p-4">{item.eu}</td>

                  <td className="p-4">{item.foot}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
