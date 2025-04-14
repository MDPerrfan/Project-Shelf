import React, { useContext, useState } from 'react'
import { AppContext } from '../Context/AppContext'
import { RotatingLines } from 'react-loader-spinner'

const Facultylist = () => {
    const { alluserName } = useContext(AppContext);
    const [expanded, setExpanded] = useState(false);
    const [showMobileTable, setShowMobileTable] = useState(false);

    if (!alluserName)
        return (
            <div className="flex items-center justify-center min-h-[20vh]">
                <RotatingLines
                    visible={true}
                    height="96"
                    width="96"
                    color=""
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />            </div>
        );
    return (
        <div className='md:w-96 w-72'>
            <p onClick={() => setExpanded(!expanded)} className='text-center font-semibold text-gray-600 p-4 border-2 cursor-pointer hidden md:block'>Click here to see list of current faculties</p>
{/* Button only visible on mobile */}
<button
        className="md:hidden bg-slate-600 text-white px-4 py-2 rounded mb-4 "
        onClick={() => setShowMobileTable(true)}
      >
        Show Faculty List
      </button>
            {expanded &&
                <div className="max-h-60 overflow-y-auto border rounded-md">

                    <table className="w-full text-left border-collapse">
                        <thead className="sticky top-0 bg-gray-100 z-10">
                            <tr>
                                <th className="text-center px-4 py-2 font-semibold text-white border-b border-slate-500 bg-slate-600">
                                    No.
                                </th>
                                <th className="text-center px-4 py-2 font-semibold text-white border-b border-slate-500 bg-slate-600">
                                    Name
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {alluserName.map((user, idx) => (
                                <tr
                                    key={idx}
                                    className={`border-b border-slate-200 ${idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                                        } hover:bg-gray-100`}
                                >
                                    <td className="text-center px-4 py-2">{idx + 1}</td>
                                    <td className="text-center px-4 py-2">{user.name}</td>

                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
}
                 {showMobileTable && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center md:hidden z-50">
                      <div className="bg-white w-11/12 max-h-[80vh] overflow-y-auto p-4 rounded-lg shadow-lg relative">
                        <button
                          className="absolute top-2 right-2 text-red-500 text-lg"
                          onClick={() => setShowMobileTable(false)}
                        >
                          ✕
                        </button>
                        <table className="w-full text-left border-collapse">
                          <thead className="sticky top-0 bg-gray-100 z-10">
                            <tr>
                              <th className="text-center px-4 py-2 font-semibold text-white border-b border-slate-500 bg-slate-600">No.</th>
                              <th className="text-center px-4 py-2 font-semibold text-white border-b border-slate-500 bg-slate-600">Name</th>
                            </tr>
                          </thead>
                          <tbody>
                            {alluserName.map((user, idx) => (
                              <tr
                                key={idx}
                                className={`border-b border-slate-200 ${idx % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
                              >
                                <td className="text-center px-4 py-2">{idx + 1}</td>
                                <td className="text-center px-4 py-2">{user.name}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  

        </div>
    )
}

export default Facultylist
