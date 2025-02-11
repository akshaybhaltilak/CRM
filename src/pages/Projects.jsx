import React, { useState, useEffect } from "react";

const Project = () => {
  // Generate a unique user ID for every visitor
  const getUserId = () => {
    let userId = localStorage.getItem("userId");
    if (!userId) {
      userId = `user_${Date.now()}`;
      localStorage.setItem("userId", userId);
    }
    return userId;
  };

  const userId = getUserId(); // Get unique user ID
  const storageKey = `projects_${userId}`; // Unique key per user

  const getStoredProjects = () => {
    const storedProjects = localStorage.getItem(storageKey);
    return storedProjects ? JSON.parse(storedProjects) : [];
  };

  const [projects, setProjects] = useState(getStoredProjects);
  const [newProject, setNewProject] = useState({
    name: "",
    location: "",
    status: "",
    budget: "",
    startDate: "",
    endDate: "",
    duration: "",
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(projects));
  }, [projects, storageKey]);

  const handleChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const calculateDuration = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    if (isNaN(startDate) || isNaN(endDate)) return "";
    const diffInMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());
    return diffInMonths > 0 ? `${diffInMonths} months` : "Invalid dates";
  };

  const addProject = (e) => {
    e.preventDefault();
    const duration = calculateDuration(newProject.startDate, newProject.endDate);

    if (newProject.name && newProject.location && newProject.status && newProject.budget && newProject.startDate && newProject.endDate) {
      const updatedProjects = [...projects, { id: projects.length + 1, ...newProject, duration }];
      setProjects(updatedProjects);
      localStorage.setItem(storageKey, JSON.stringify(updatedProjects));
      setNewProject({ name: "", location: "", status: "", budget: "", startDate: "", endDate: "", duration: "" });
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Project Management</h2>

      <form onSubmit={addProject} className="mb-4 flex flex-wrap gap-2">
        <input type="text" name="name" value={newProject.name} onChange={handleChange} placeholder="Project Name" className="border p-2" required />
        <input type="text" name="location" value={newProject.location} onChange={handleChange} placeholder="Location" className="border p-2" required />
        <input type="text" name="status" value={newProject.status} onChange={handleChange} placeholder="Status" className="border p-2" required />
        <input type="text" name="budget" value={newProject.budget} onChange={handleChange} placeholder="Budget" className="border p-2" required />
        <input type="date" name="startDate" value={newProject.startDate} onChange={handleChange} className="border p-2" required />
        <input type="date" name="endDate" value={newProject.endDate} onChange={handleChange} className="border p-2" required />
        <button type="submit" className="bg-green-500 text-white px-4 py-2">Add Project</button>
      </form>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Project Name</th>
            <th className="border p-2">Location</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Budget</th>
            <th className="border p-2">Start Date</th>
            <th className="border p-2">End Date</th>
            <th className="border p-2">Duration</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id} className="border">
              <td className="border p-2">{project.name}</td>
              <td className="border p-2">{project.location}</td>
              <td className="border p-2">{project.status}</td>
              <td className="border p-2">{project.budget}</td>
              <td className="border p-2">{project.startDate}</td>
              <td className="border p-2">{project.endDate}</td>
              <td className="border p-2">{project.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Project;
