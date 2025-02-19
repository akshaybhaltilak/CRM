import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([
    { id: 1, name: "Building A", status: "Ongoing" },
    { id: 2, name: "Bridge B", status: "Completed" },
    { id: 3, name: "Apartment C", status: "Ongoing" },
  ]);

  const handleNewProject = () => {
    const newProject = {
      id: projects.length + 1,
      name: `Project ${projects.length + 1}`,
      status: "Ongoing",
    };
    setProjects([...projects, newProject]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Construction Projects</h1>
        <button
          onClick={handleNewProject}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          New Project
        </button>

        {/* Ongoing Projects */}
        <h2 className="text-xl font-semibold mt-6">Ongoing Projects</h2>
        <ul className="mt-2">
          {projects
            .filter((project) => project.status === "Ongoing")
            .map((project) => (
              <li
                key={project.id}
                className="cursor-pointer p-2 bg-gray-200 rounded mt-2 hover:bg-gray-300"
                onClick={() => navigate(`/dashboard/${project.id}`)}
              >
                {project.name}
              </li>
            ))}
        </ul>

        {/* All Projects */}
        <h2 className="text-xl font-semibold mt-6">All Projects</h2>
        <ul className="mt-2">
          {projects.map((project) => (
            <li
              key={project.id}
              className="cursor-pointer p-2 bg-gray-200 rounded mt-2 hover:bg-gray-300"
              onClick={() => navigate(`/dashboard/${project.id}`)}
            >
              {project.name} - {project.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
