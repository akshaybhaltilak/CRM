import React, { useState } from "react";

const Material = () => {
  const [materials, setMaterials] = useState([
    { id: 1, name: "Sand", quantity: "10 tons", cost: "$500" },
    { id: 2, name: "Bricks", quantity: "5000 units", cost: "$2000" },
  ]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Material Management</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Material</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Cost</th>
          </tr>
        </thead>
        <tbody>
          {materials.map((material) => (
            <tr key={material.id} className="border">
              <td className="border p-2">{material.name}</td>
              <td className="border p-2">{material.quantity}</td>
              <td className="border p-2">{material.cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Material;