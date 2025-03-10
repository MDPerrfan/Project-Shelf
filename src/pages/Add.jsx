import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AppContext } from '../Context/AppContext';
import { Oval } from 'react-loader-spinner';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { toast } from 'react-toastify';

const predefinedKeywords = [
  "Artificial Intelligence", "Machine Learning", "Deep Learning", "Chatbot", "NLP",
  "Blockchain", "Cybersecurity", "Web Development", "Data Science", "Cloud Computing",
  "IoT", "Robotics", "Computer Vision", "Software Engineering", "Big Data"
];

const Add = () => {
  const navigate = useNavigate();
  const { userData, backendUrl } = useContext(AppContext);
  const [numStudents, setNumStudents] = useState(1);
  const [project, setProject] = useState({
    students: [{ id: "", name: "" }],
    batch: "",
    title: "",
    supervisor: userData?.name || "",
    year: "",
    link: "",
    keywords: [],
    customKeyword: ""
  });
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2016 }, (_, i) => 2017 + i);
  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleKeywordChange = (keyword) => {
    setProject((prev) => ({
      ...prev,
      keywords: prev.keywords.includes(keyword)
        ? prev.keywords.filter((k) => k !== keyword)
        : [...prev.keywords, keyword]
    }));
  };

  const handleCustomKeyword = (e) => {
    setProject({ ...project, customKeyword: e.target.value });
  };

  const addCustomKeyword = () => {
    if (project.customKeyword.trim()) {
      setProject((prev) => ({
        ...prev,
        keywords: [...prev.keywords, prev.customKeyword.trim()],
        customKeyword: ""
      }));
    }
  };
  const removeKeyword = (keyword) => {
    setProject((prev) => ({
      ...prev,
      keywords: prev.keywords.filter((k) => k !== keyword)
    }));
  };

  const handleStudentChange = (index, field, value) => {
    setProject(prev => {
      const newStudents = [...prev.students];
      newStudents[index] = {
        ...newStudents[index],
        [field]: value
      };
      return {
        ...prev,
        students: newStudents
      };
    });
  };

  const handleNumStudentsChange = (e) => {
    const num = parseInt(e.target.value);
    setNumStudents(num);
    setProject(prev => ({
      ...prev,
      students: Array(num).fill(null).map((_, index) => 
        prev.students[index] || { id: "", name: "" }
      )
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/project/create`, project);
      if (data.success) {
        toast.success("Project added successfully!");
        setProject({
          students: [{ id: "", name: "" }],
          batch: "",
          title: "",
          supervisor: userData?.name || "",
          year: "",
          link: "",
          keywords: [],
          customKeyword: ""
        });
        setNumStudents(1);
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Show toast notification if Student ID already exists
        toast.error(error.response.data.message);
      } else {
        console.log(error);
        toast.error("An error occurred while adding the project.");
      }
    }
  };
  
  if (!userData) return (
    <div className='flex items-center justify-center min-h-screen'>
      <Oval height="80" width="80" color="#4fa94d" ariaLabel="oval-loading" />
    </div>
  );

  return (
    <div className=''>
      <div className='flex items-center justify-between border-b shadow py-0.5 px-4 sm:px-10 md:px-14 lg:px-36 '>
        <div>
          <img onClick={() => navigate('/')} src={assets.pciu} alt="Logo" className="w-10 sm:w-14 cursor-pointer m-1" />
        </div>
      <div className='flex items-center gap-3 cursor-pointer group relative'>
            <img className='w-8 rounded-full' src={userData.image} alt="User" />
            <img className='w-2.5' src={assets.dropdown_icon} alt="Dropdown" />
            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
              <div className='min-w-48 bg-stone-100 p-4 rounded flex flex-col gap-4'>
                <p onClick={() => navigate('/dashboard')} className='hover:text-black cursor-pointer'>Dashboard</p>
                <p onClick={() => navigate('/profile')} className='hover:text-black cursor-pointer'>Profile</p>
              </div>
            </div>
          </div>
      </div>

      <div className="flex">
        <div className='hidden lg:block'>
        <Sidebar />
        </div>
        <div className="p-6 w-full">
          <form className="m-5 max-w-6xl" onSubmit={handleSubmit}>
            <p className="mb-5 text-lg font-medium text-gray-700">Add Project</p>
            <div className="bg-white px-8 py-8 border rounded w-full max-h-[80vh] overflow-y-scroll">
              <div className="flex flex-col lg:flex-row gap-10 text-gray-600">
                <div className="w-full lg:flex-1 flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <p>Number of Students</p>
                    <select 
                      className="border rounded px-3 py-2"
                      value={numStudents}
                      onChange={handleNumStudentsChange}
                    >
                      {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                  
                  {project.students.map((student, index) => (
                    <div key={index} className="border p-4 rounded">
                      <p className="font-medium mb-2">Student {index + 1}</p>
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                          <p>Student ID</p>
                          <input 
                            className="border rounded px-3 py-2"
                            type="text"
                            value={student.id}
                            onChange={(e) => handleStudentChange(index, 'id', e.target.value)}
                            required
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <p>Student Name</p>
                          <input 
                            className="border rounded px-3 py-2"
                            type="text"
                            value={student.name}
                            onChange={(e) => handleStudentChange(index, 'name', e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="flex flex-col gap-1">
                    <p>Batch</p>
                    <input 
                      className="border rounded px-3 py-2"
                      type="text"
                      name="batch"
                      value={project.batch}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <p>Project Title</p>
                    <input 
                      className="border rounded px-3 py-2"
                      type="text"
                      name="title"
                      value={project.title}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="w-full lg:flex-1 flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <p>Supervisor</p>
                    <input className="border rounded px-3 py-2" type="text" name="supervisor" value={project.supervisor} readOnly />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p>Year</p>
                    <select className="border rounded p-2" name="year" value={project.year} onChange={handleChange} required>
                      <option value="">Select Year</option>
                      {years.map((year) => <option key={year} value={year}>{year}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p>Project Link (if have)</p>
                    <input className="border rounded px-3 py-2" type="url" name="link" value={project.link} onChange={handleChange} />
                  </div>

                  <div className="flex flex-col gap-1">
                    <p>Technologies used</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {predefinedKeywords.map((keyword) => (
                        <label key={keyword} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={project.keywords.includes(keyword)}
                            onChange={() => handleKeywordChange(keyword)}
                          />
                          <span>{keyword}</span>
                        </label>
                      ))}
                    </div>
                    <div className="mt-3 flex flex-col md:flex-row gap-2">
                      <input
                        className="border rounded px-3 py-2 flex-grow"
                        type="text"
                        placeholder="Enter technology"
                        value={project.customKeyword}
                        onChange={handleCustomKeyword}
                      />
                      <button
                        type="button"
                        onClick={addCustomKeyword}
                        className="px-3 py-2 bg-gray-200 rounded"
                      >
                        Add
                      </button>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.keywords.map((keyword) => (
                        <span key={keyword} className="px-3 py-1 bg-blue-200 rounded-full flex items-center gap-2">
                          {keyword}
                          <button onClick={() => removeKeyword(keyword)} className="text-red-500">×</button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <button type="submit" className="px-10 py-3 text-white rounded-full bg-orange-600 mt-5">Add Project</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add;
