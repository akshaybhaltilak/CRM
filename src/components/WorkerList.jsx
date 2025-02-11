import React from 'react';

const WorkerList = ({ workers }) => {
  return (
    <div className="space-y-4">
      {workers.map(worker => (
        <div key={worker.id} className="p-4 bg-white shadow rounded">
          <h2 className="text-xl font-bold">{worker.name}</h2>
          <p>{worker.role}</p>
          <p>{worker.paymentType}</p>
        </div>
      ))}
    </div>
  );
};

export default WorkerList;