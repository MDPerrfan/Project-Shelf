import React from 'react'
import { projects } from '../assets/assets'
import { useState } from "react";

const Table = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [supervisorFilter, setSupervisorFilter] = useState("");
    const [yearFilter, setYearFilter] = useState("");

    const filteredProjects = projects.filter((project) => {
        return (
            (searchTerm === "" ||
                project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.keywords.some((keyword) =>
                    keyword.toLowerCase().includes(searchTerm.toLowerCase())
                )
            ) &&
            (supervisorFilter === "" ||
                project.supervisor.toLowerCase() === supervisorFilter.toLowerCase()
            ) &&
            (yearFilter === "" || project.year === yearFilter)
        );
    });

    return (
        <div className="py-0.5 px-4 sm:px-10 md:px-14 lg:px-36 min-h-screen">
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
                        <option value="">Filter by Year</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                    </select>
                </div>
            </div>

            <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
                <table className="w-full text-left table-auto min-w-max">
                    <thead>
                        <tr>
                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p className="block text-sm font-normal leading-none text-slate-500">
                                    Project ID
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p className="block text-sm font-normal leading-none text-slate-500">
                                    Student
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p className="block text-sm font-normal leading-none text-slate-500">
                                    Supervisor
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p className="block text-sm font-normal leading-none text-slate-500">
                                    Title
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p className="block text-sm font-normal leading-none text-slate-500">
                                    Year
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p className="block text-sm font-normal leading-none text-slate-500">
                                    Keywords
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProjects.map((project, index) => (
                            <tr key={index} className="hover:bg-slate-50">
                                <td className="p-4 border-b border-slate-200 py-5">
                                    <p className="block font-semibold text-sm text-slate-800">
                                        {project.id}
                                    </p>
                                </td>
                                <td className="p-4 border-b border-slate-200 py-5">
                                    <p className="text-sm text-slate-500">{project.name}</p>
                                </td>
                                <td className="p-4 border-b border-slate-200 py-5">
                                    <p className="text-sm text-slate-500">{project.supervisor}</p>
                                </td>
                                <td className="p-4 border-b border-slate-200 py-5">
                                    <p className="text-sm text-slate-500">{project.title}</p>
                                </td>
                                <td className="p-4 border-b border-slate-200 py-5">
                                    <p className="text-sm text-slate-500">{project.year}</p>
                                </td>
                                <td className="p-4 border-b border-slate-200 py-5">
                                    <p className="text-sm text-slate-500">
                                        {project.keywords.join(", ")}
                                    </p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table
