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
  const { userData, projectData, setProjectData, logout, backendUrl } = useContext(AppContext);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editedProject, setEditedProject] = useState({});

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/project/get`);
      setProjectData(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast.error("Failed to fetch projects");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (!userData || !projectData) return;
    const filtered = projectData.filter(
      (project) => project.supervisor === userData.name
    );
    setFilteredProjects(filtered);
  }, [userData, projectData]);

  const handleEditClick = (project) => {
    setEditingProjectId(project._id);
    setEditedProject({ ...project });
  };

  const handleChange = (e, field) => {
    if (field === 'keywords') {
      // Handle keywords as an array
      const keywordsArray = e.target.value.split(',').map(k => k.trim());
      setEditedProject({ ...editedProject, [field]: keywordsArray });
    } else {
      setEditedProject({ ...editedProject, [field]: e.target.value });
    }
  };

  const handleSave = async (id) => {
    try {
      // Validate required fields
      if (!editedProject.batch || !editedProject.title || !editedProject.year) {
        toast.error("Please fill in all required fields");
        return;
      }

      // Validate students
      if (!editedProject.students || editedProject.students.length === 0) {
        toast.error("At least one student is required");
        return;
      }

      // Check for empty student fields
      const invalidStudent = editedProject.students.find(student => !student.sid || !student.name);
      if (invalidStudent) {
        toast.error("All students must have both ID and name filled");
        return;
      }

      // Check for duplicate student IDs
      const sids = editedProject.students.map(s => s.sid);
      if (new Set(sids).size !== sids.length) {
        toast.error("Duplicate student IDs are not allowed");
        return;
      }

      // Prepare the update data
      const updateData = {
        batch: editedProject.batch,
        title: editedProject.title,
        supervisor: editedProject.supervisor,
        year: editedProject.year,
        link: editedProject.link || '',
        keywords: editedProject.keywords || [],
        students: editedProject.students.map(student => ({
          sid: student.sid,
          name: student.name
        }))
      };

      const response = await axios.put(`${backendUrl}/api/project/update/${id}`, updateData);
      
      // The server returns the updated project directly
      const updatedProject = response.data;
      
      if (updatedProject && updatedProject._id) {
        
        // Update filtered projects
        setFilteredProjects(prevData => {
          const newData = prevData.map(proj => 
            proj._id === id ? updatedProject : proj
          );
          return newData;
        });
        
        // Update global project data
        setProjectData(prevData => {
          const newData = prevData.map(proj => 
            proj._id === id ? updatedProject : proj
          );
          return newData;
        });
        
        toast.success("Project updated successfully!");
        setEditingProjectId(null);
        setEditedProject({});
      } else {
        console.error('Invalid project data:', response.data);
        toast.error("Failed to update project: Invalid project data");
      }
    } catch (error) {
      console.error("Error updating project:", error);
      console.error("Error response:", error.response?.data);
      const errorMessage = error.response?.data?.error || 
                          error.response?.data?.message || 
                          "Failed to update project";
      toast.error(errorMessage);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${backendUrl}/api/project/delete/${id}`);
      if (response.data.success) {
        setFilteredProjects(prevData => prevData.filter(proj => proj._id !== id));
        setProjectData(prevData => prevData.filter(proj => proj._id !== id));
        toast.success("Project deleted successfully!");
      } else {
        toast.error(response.data.message || "Failed to delete project");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error(error.response?.data?.message || "Failed to delete project");
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
                    {["Students", "Batch", "Title", "Supervisor", "Year", "Link", "Keywords", "Actions"].map((heading, index) => (
                      <th key={index} className="p-4 text-sm font-semibold border-b border-slate-500">{heading}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.map((project, index) => (
                    <tr key={project._id} className={`border-b border-slate-200 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}>
                      <td className="p-4 text-md text-slate-600">
                        {editingProjectId === project._id ? (
                          <div className="space-y-2">
                            {editedProject.students?.map((student, idx) => (
                              <div key={idx} className="flex gap-2">
                                <input 
                                  type="text" 
                                  value={student.sid} 
                                  onChange={(e) => {
                                    const newStudents = [...editedProject.students];
                                    newStudents[idx] = { ...student, sid: e.target.value };
                                    setEditedProject({ ...editedProject, students: newStudents });
                                  }} 
                                  className="border p-1 w-1/2" 
                                  placeholder="Student ID"
                                />
                                <input 
                                  type="text" 
                                  value={student.name} 
                                  onChange={(e) => {
                                    const newStudents = [...editedProject.students];
                                    newStudents[idx] = { ...student, name: e.target.value };
                                    setEditedProject({ ...editedProject, students: newStudents });
                                  }} 
                                  className="border p-1 w-1/2" 
                                  placeholder="Student Name"
                                />
                                {idx === editedProject.students.length - 1 && editedProject.students.length < 5 && (
                                  <button 
                                    onClick={() => {
                                      setEditedProject({
                                        ...editedProject,
                                        students: [...editedProject.students, { sid: '', name: '' }]
                                      });
                                    }}
                                    className="bg-green-500 text-white px-2 rounded"
                                  >
                                    +
                                  </button>
                                )}
                                {editedProject.students.length > 1 && (
                                  <button 
                                    onClick={() => {
                                      setEditedProject({
                                        ...editedProject,
                                        students: editedProject.students.filter((_, i) => i !== idx)
                                      });
                                    }}
                                    className="bg-red-500 text-white px-2 rounded"
                                  >
                                    -
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="space-y-1">
                            {project.students?.map((student, idx) => (
                              <div key={idx} className="text-sm">
                                <span className="font-medium">{student.sid}</span> - {student.name}
                              </div>
                            ))}
                          </div>
                        )}
                      </td>
                      {["batch", "title", "supervisor", "year", "link", "keywords"].map((key, i) => (
                        <td key={i} className="p-4 text-md text-slate-600">
                          {editingProjectId === project._id ? (
                            key === 'keywords' ? (
                              <input 
                                type="text" 
                                value={editedProject[key]?.join(', ') || ''} 
                                onChange={(e) => handleChange(e, key)} 
                                className="border p-1 w-full" 
                                placeholder="Comma-separated keywords"
                              />
                            ) : (
                              <input 
                                type="text" 
                                value={editedProject[key] || ''} 
                                onChange={(e) => handleChange(e, key)} 
                                className="border p-1 w-full" 
                              />
                            )
                          ) : (
                            key === 'link' ? (
                              project[key] ? (
                                <a href={project[key]} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                  View
                                </a>
                              ) : (
                                <span className="text-gray-400">No link</span>
                              )
                            ) : key === 'keywords' ? (
                              <div className="flex flex-wrap gap-1">
                                {project[key]?.map((keyword, idx) => (
                                  <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                                    {keyword}
                                  </span>
                                ))}
                              </div>
                            ) : project[key]
                          )}
                        </td>
                      ))}
                      <td className="p-4 flex flex-col gap-2">
                        {editingProjectId === project._id ? (
                          <button onClick={() => handleSave(project._id)} className="bg-green-700 text-white px-3 py-1 rounded-full">
                            Save
                          </button>
                        ) : (
                          <button onClick={() => handleEditClick(project)} className="bg-blue-700 text-white px-3 py-1 rounded-full">
                            Edit
                          </button>
                        )}
                        <button onClick={() => handleDelete(project._id)} className="bg-red-600 text-white px-3 py-1 rounded-full">
                          Delete
                        </button>
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
