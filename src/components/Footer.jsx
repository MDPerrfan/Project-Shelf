import React from 'react'

const Footer = () => {
    return (
        <div className=' bg-slate-500'>
            <div className='min-h-24 py-0.5 px-4 sm:px-10 md:px-14 lg:px-36 flex items-center justify-between lg:flex-row md:flex-row flex-col '>
                <div className=''>
                    <p className='text-xl font-bold text-gray-300'>Department of Computer Science and Engineering</p>
                    <p className='text-base text-gray-400'>Port City International University</p>
                </div>

                <div>
                <p className='text-base text-gray-400'>© 2025<span className='text-orange-500'> <a href="https://devparves.netlify.app">Parves</a></span></p>

                    <p className='text-base font-bold text-gray-300'>Connect with me</p>
                    <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </div>
        </div>

    )
}

export default Footer
