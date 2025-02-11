import React from 'react';

const ProjectList = ({ projects }) => {
  return (
    <div className="space-y-4">
      {projects.map(project => (
        <div key={project.id} className="p-4 bg-white shadow rounded">
          <h2 className="text-xl font-bold">{project.name}</h2>
          <p>{project.location}</p>
          <p>{project.status}</p>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;