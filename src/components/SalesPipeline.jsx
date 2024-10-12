import React, { useState } from 'react';

const stages = ['Lead', 'Contacted', 'Proposal Sent', 'Closed'];

const SalesPipeline = () => {
  const [pipeline, setPipeline] = useState([
    { customer: 'Customer 1', stage: 0 },
    { customer: 'Customer 2', stage: 1 },
  ]);

  const moveForward = (index) => {
    const updatedPipeline = [...pipeline];
    updatedPipeline[index].stage = Math.min(updatedPipeline[index].stage + 1, stages.length - 1);
    setPipeline(updatedPipeline);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Sales Pipeline</h2>
      <div className="grid grid-cols-4 gap-4">
        {stages.map((stage, idx) => (
          <div key={idx} className="border p-4">
            <h3 className="font-semibold mb-2">{stage}</h3>
            {pipeline
              .filter((p) => p.stage === idx)
              .map((p, i) => (
                <div key={i} className="border p-2 mb-2">
                  {p.customer}
                  <button
                    className="ml-2 text-sm bg-green-500 text-white p-1 rounded"
                    onClick={() => moveForward(i)}
                  >
                    Next Stage
                  </button>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesPipeline;
