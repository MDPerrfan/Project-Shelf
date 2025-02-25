import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets';
import { AppContext } from '../Context/AppContext';
import { Oval } from 'react-loader-spinner'
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const navigate = useNavigate();
  const { userData, projectData } = useContext(AppContext)
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    if (!userData || !projectData) return; // Ensure userData is available before filtering

    // Filter projects where the logged-in user is the supervisor
    const filtered = projectData.filter(
      (project) => project.supervisor === userData.name
    );
    setFilteredProjects(filtered);
  }, [userData], [projectData]); // Dependency added to re-run when userData updates

  // Show loading spinner if userData is not available
  if (!userData)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Oval visible={true} height="80" width="80" color="#4fa94d" ariaLabel="oval-loading" />
      </div>
    );
  return (
    <div className=''>
      <div className='flex items-center justify-between border-b shadow py-0.5 px-4 sm:px-10 md:px-14 lg:px-36 '>
        <div className=''>
          <img
            onClick={() => navigate('/')}
            src={assets.pciu}
            alt="Logo"
            className=" sm:left-20  w-10 sm:w-14 cursor-pointer m-1"
          />
        </div>
        <div>
          <img onClick={() => navigate('/profile')} className='w-10 rounded-full cursor-pointer' src={userData.image} alt="User" />
        </div>
      </div>
      <div className="flex">
        {/* Sidebar */}
        <div className=" ">
          <Sidebar />
        </div>
        {/* Main Content */}
        <div className=" p-6">
          <h1 className="text-lg sm:text-xl font-semibold  text-orange-600">Projects/Thesis done under my supervission:</h1>
          <p className="text-lg font-medium text-gray-700 my-2">
            Total Projects: <span className="font-bold">{filteredProjects.length}</span>
          </p>
          <div className="overflow-x-auto p-4">
            {/* Header Row */}
            <div className="hidden md:grid grid-cols-8 bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg">
              <div className="hidden lg:block p-2">#</div>
              <div className="p-2">Project Title</div>
              <div className="p-2">Student Name</div>
              <div className="p-2">Student ID</div>
              <div className="p-2">Batch</div>
              <div className="p-2">Year</div>
              <div className="p-2">Link</div>
              <div className="p-2">Keywords</div>
            </div>

            {/* Data Rows */}
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className=" grid grid-cols-1 md:grid-cols-7 lg:grid-cols-8 items-center border-b p-4 text-gray-700 gap-2 md:gap-0"
                >
                  <div className="hidden lg:block font-semibold ">{index + 1}</div>
                  <div className="hidden md:block font-medium text-gray-600">{project.title}</div>
                  <div className='hidden md:block text-gray-600'>{project.name}</div>
                  <div className='hidden md:block text-gray-600'>{project.id}</div>
                  <div className='hidden md:block text-gray-600'>{project.batch}</div>
                  <div className="hidden md:block text-gray-600">{project.year}</div>
                  <div className='hidden md:block'>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      View
                    </a>
                  </div>
                  <div className="hidden md:block text-gray-600">{project.keywords.join(", ")}</div>

                  {/* ✅ Card Style for Small Screens */}
                  <div className="md:hidden bg-white shadow-md rounded-lg p-4 border">
                    <p className="text-lg font-semibold text-gray-800">
                      {index + 1}. {project.title}
                    </p>
                    <p>
                      <span className="font-medium">Student:</span> {project.name}
                    </p>
                    <p>
                      <span className="font-medium">ID:</span> {project.id}
                    </p>
                    <p>
                      <span className="font-medium">Batch:</span> {project.batch}
                    </p>
                    <p>
                      <span className="font-medium">Year:</span> {project.year}
                    </p>
                    <p>
                      <span className="font-medium">Link:</span>{" "}
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        View
                      </a>
                    </p>
                    <p>
                      <span className="font-medium">Keywords:</span>{" "}
                      {project.keywords.join(", ")}
                    </p>
                  </div>
                </div>

              ))
            ) : (
              <div className="text-center text-gray-500 py-4">
                No projects found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
