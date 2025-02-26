import React, { useContext, useEffect } from 'react'
import { projects } from '../assets/assets'
import { useState } from "react";
import { AppContext } from '../Context/AppContext';
import { Oval } from 'react-loader-spinner'

const Table = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [supervisorFilter, setSupervisorFilter] = useState("");
    const [yearFilter, setYearFilter] = useState("");
    const [filteredProjects, setFilteredProjects] = useState([]);

    const { projectData } = useContext(AppContext);
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 2016 }, (_, i) => 2017 + i);
    useEffect(() => {
        if (!projectData) return;
        const filtered = projectData.filter((project) => {
            return (
                (searchTerm === "" ||
                    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    project.keywords.some((keyword) =>
                        keyword.toLowerCase().includes(searchTerm.toLowerCase())
                    )) &&
                (supervisorFilter === "" ||
                    project.supervisor.toLowerCase() === supervisorFilter.toLowerCase()) &&
                (yearFilter === "" || project.year === yearFilter)
            );
        });
        setFilteredProjects(filtered);
    }, [projectData, searchTerm, supervisorFilter, yearFilter]);
    if (!projectData)
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Oval visible={true} height="80" width="80" color="#4fa94d" ariaLabel="oval-loading" />
            </div>
        );
    return (
        <div className="py-0.5 px-4 sm:px-10 md:px-14 lg:px-36 min-h-lvh">
            <div className="flex flex-col lg:flex-row md:items-start md:flex-row justify-between mb-3 mt-1 ">
                <div className='flex flex-col gap-1 mb-2'>
                    <div className="relative w-full max-w-sm">
                        <input
                            type="text"
                            placeholder="Search"
                            className="p-2 pl-10 border border-gray-300 rounded-md w-full"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <svg
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-4.35-4.35M16 10a6 6 0 1 0-12 0 6 6 0 0 0 12 0z"
                            />
                        </svg>
                    </div>

                </div>

                <div className='flex flex-col justify-start gap-1'>
                    <select
                        className="p-2 border border-gray-300 rounded-md text-gray-600 text-sm"
                        onChange={(e) => setSupervisorFilter(e.target.value)}
                    >
                        <option value="">Filter by Supervisor</option>
                        {Array.from(new Set(projects.map((project) => project.supervisor))).map((supervisor, index) => (
                            <option key={index} value={supervisor}>
                                {supervisor}
                            </option>
                        ))}
                    </select>
                    <select
                        className="p-2 border border-gray-300 rounded-md text-gray-600 text-sm"
                        onChange={(e) => setYearFilter(e.target.value)}
                    >
                        <option value="">Select Year</option>
                        {years.map((year) => <option key={year} value={year}>{year}</option>)}
                    </select>
                </div>
            </div>

            <div className="relative w-full h-full overflow-auto bg-white shadow-lg rounded-lg">
                <table className="w-full text-left border-collapse">
                    {/* Table Header */}
                    <thead className="sticky top-0 bg-slate-700 text-white">
                        <tr>
                            {["Student ID", "Student Name", "Batch", "Supervisor", "Title", "Link", "Year", "Technologies"].map((heading, index) => (
                                <th key={index} className="p-4 text-sm font-semibold border-b border-slate-500">
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {filteredProjects.map((project, index) => (
                            <tr key={index} className={`border-b border-slate-200 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}>
                                <td className="p-4 text-sm font-medium text-slate-700">{project.id}</td>
                                <td className="p-4 text-sm text-slate-600">{project.name}</td>
                                <td className="p-4 text-sm text-slate-600">{project.batch}</td>
                                <td className="p-4 text-sm text-slate-600">{project.supervisor}</td>
                                <td className="p-4 text-sm text-slate-600">{project.title}</td>
                                <td className="p-4 text-sm">
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 hover:underline">
                                        View
                                    </a>
                                </td>
                                <td className="p-4 text-sm text-slate-600 ">{project.year}</td>
                                <td className="p-4 text-sm text-slate-600 ">{project.keywords.join(", ")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default Table
