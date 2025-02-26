import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { assets } from '../assets/assets';
import { AppContext } from '../Context/AppContext';
import { Oval } from 'react-loader-spinner';
import Sidebar from '../components/Sidebar';
import { toast } from 'react-toastify';
const Dashboard = () => {
  const navigate = useNavigate();
  const { userData, projectData, logout,backendUrl } = useContext(AppContext);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editedProject, setEditedProject] = useState({});

  useEffect(() => {
    if (!userData || !projectData) return;
    const filtered = projectData.filter(
      (project) => project.supervisor === userData.name
    );
    setFilteredProjects(filtered);
  }, [userData, projectData]);

  const handleEditClick = (project) => {
    setEditingProjectId(project.id);
    setEditedProject({ ...project });
  };

  const handleChange = (e, field) => {
    setEditedProject({ ...editedProject, [field]: e.target.value });
  };

  const handleSave = async (id) => {
    try {
      const response = await axios.put(`${backendUrl}/api/project/update/${id}`, editedProject);
      setFilteredProjects(
        filteredProjects.map((proj) => (proj._id === id ? response.data : proj))
      );
      toast.success("Updated!")
      setEditingProjectId(null);
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error("Failed to updated!")
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/project/delete/${id}`);
      setFilteredProjects(filteredProjects.filter((proj) => proj._id !== id));
      toast.success("Deleted!")
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  if (!userData)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Oval visible={true} height="80" width="80" color="#4fa94d" ariaLabel="oval-loading" />
      </div>
    );

  return (
    <div>
      <div className="flex items-center justify-between border-b shadow py-0.5 px-4 sm:px-10 md:px-14 lg:px-36">
        <div>
          <img onClick={() => navigate('/')} src={assets.pciu} alt="Logo" className="sm:left-20 w-10 sm:w-14 cursor-pointer m-1" />
        </div>
        <div className="flex items-center gap-3 cursor-pointer group relative">
          <img className="w-8 rounded-full" src={userData.image} alt="User" />
          <img className="w-2.5" src={assets.dropdown_icon} alt="Dropdown" />
          <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
            <div className="min-w-48 bg-stone-100 p-4 rounded flex flex-col gap-4">
              <p onClick={() => navigate('/add-projects')} className="hover:text-black cursor-pointer">Add Project</p>
              <p onClick={() => navigate('/profile')} className="hover:text-black cursor-pointer">Profile</p>
              <p onClick={logout} className="hover:text-black cursor-pointer">Logout</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <div className="p-6 w-full">
          <h1 className="text-lg sm:text-xl font-semibold text-orange-600">Projects/Thesis done under my supervision:</h1>
          <p className="text-lg font-medium text-gray-700 my-2">
            Total Projects: <span className="font-bold">{filteredProjects.length}</span>
          </p>
          {filteredProjects.length > 0 ? (
            <div className="relative w-full overflow-auto bg-white shadow-lg rounded-lg">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-slate-700 text-white">
                  <tr>
                    {["Student ID", "Student Name", "Batch", "Title", "Supervisor", "Year", "Link", "Keywords", "Actions"].map((heading, index) => (
                      <th key={index} className="p-4 text-sm font-semibold border-b border-slate-500">{heading}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.map((project, index) => (
                    <tr key={index} className={`border-b border-slate-200 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}>
                      {["id", "name", "batch", "title", "supervisor", "year", "link", "keywords"].map((key, i) => (
                        <td key={i} className="p-4 text-md text-slate-600">
                          {editingProjectId === project.id && key !== 'id' ? (
                            <input type="text" value={editedProject[key] || ''} onChange={(e) => handleChange(e, key)} className="border p-1 w-full" />
                          ) : (
                            key === 'link' ? <a href={project[key]} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View</a> : project[key]
                          )}
                        </td>
                      ))}
                      <td className="p-4 flex flex-col gap-2">
                        {editingProjectId === project.id ? (
                          <button onClick={() => handleSave(project._id)} className="bg-green-700 text-white px-3 py-1 rounded-full">Save</button>
                        ) : (
                          <button onClick={() => handleEditClick(project)} className="bg-blue-700 text-white px-3 py-1 rounded-full">Edit</button>
                        )}
                        <button onClick={() => handleDelete(project._id)} className="bg-red-600 text-white px-3 py-1 rounded-full">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-4">No projects found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
