import React from 'react';

const MaterialList = ({ materials }) => {
  return (
    <div className="space-y-4">
      {materials.map(material => (
        <div key={material.id} className="p-4 bg-white shadow rounded">
          <h2 className="text-xl font-bold">{material.name}</h2>
          <p>{material.quantity}</p>
          <p>{material.cost}</p>
        </div>
      ))}
    </div>
  );
};

export default MaterialList;