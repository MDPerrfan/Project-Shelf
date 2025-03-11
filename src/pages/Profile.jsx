import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets';
import { AppContext } from '../Context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import { Oval } from 'react-loader-spinner'

const MyProfile = () => {
    const { userData, setUserData, backendUrl, loadUserProfile } = useContext(AppContext);
    const [isEdit, setIsEdit] = useState(false)
    const [image, setImage] = useState(false)
    if (!userData) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Oval
                    visible={true}
                    height={80}
                    width={80}
                    color="#4fa94d"
                    ariaLabel="oval-loading"
                />
            </div>
        );
    }
    const address = userData.address || { line1: "", line2: "" };
    const updateUserProfileData = async () => {
        try {
            const formData = new FormData()
            formData.append('userId', userData._id)
            formData.append('name', userData.name)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify(userData.address))
            formData.append('gender', userData.gender)
            formData.append('dob', userData.dob)

            image && formData.append('image', image)

            console.log('Sending data:', Object.fromEntries(formData));

            const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData)

            if (data.success) {
                toast.success(data.message)
                await loadUserProfile()
                setIsEdit(false)
                setImage(false)
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Update profile error:', error);
            toast.error(error.response?.data?.message || "Failed to update profile");
        }
    }


    return userData && (
        <div className=' '>
            <Navbar />
            <div className='flex flex-col gap-2 text-sm lg:px-56 md:px-36 sm:px-14 px-5'>
                {
                    isEdit ?
                        <label htmlFor="image">
                            <div className='inline-block relative cursor-pointer'>
                                <img className='w-36 rounded-full opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
                                <img className='w-10 absolute bottom-12 right-12' src={image ? '' : assets.upload_icon} alt="" />
                            </div>
                            <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden />
                        </label>
                        : <img className='max-w-44 rounded-full my-2' src={userData.image} alt="" />

                }
                {
                    isEdit
                        ? <input className='bg-gray-200 text-3xl font-medium max-w-60 mt-4 rounded-lg' onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} value={userData.name} type='text' />
                        : <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
                }
                <hr className='bg-zinc-400 h-[1px] border-none' />
                <div>
                    <p className='text-neutral-500 underline mt-3'>Contact info</p>
                    <div className='grid grid-cols-[1fr_2fr] gap-y-3 mt-3 text-neutral-700'>
                        <p className='font-medium'>Email id:</p>
                        <p className='text-blue-950'>{userData.email}</p>
                        <p className='font-medium'>Phone</p>
                        {
                            isEdit
                                ? <input className='bg-gray-200 max-w-52  rounded-md p-1' onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} value={userData.phone} type='text' />
                                : <p className='text-blue-900'>{userData.phone}</p>
                        }
                        <p className='font-medium'>Adress:</p>
                        {
                            isEdit
                                ? <p>
                                    <input className='bg-gray-200 max-w-52 rounded-md p-1' onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} type='text' /><br />
                                    <input className='bg-gray-200 max-w-52 mt-1 rounded-md p-1' onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} type='text' />
                                </p>
                                : <p className='text-gray-500'>{address.line1}<br />{address.line2}</p>
                        }
                    </div>
                </div>
                <div>
                    <p className='text-neutral-500 underline mt-3'>Basic information:</p>
                    <div className='grid grid-cols-[1fr_2fr] gap-y-3 mt-3 text-neutral-700'>
                        <p className='font-medium'>Gender:</p>
                        {
                            isEdit
                                ? <select className='max-w-20 bg-gray-200  rounded-md p-1' onChange={e => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender} name="" id="">
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                                : <p className='text-gray-500'>{userData.gender}</p>
                        }
                        <p className='font-medium'>Birthday:</p>
                        {
                            isEdit
                                ? <input className='bg-gray-200 max-w-28  rounded-md p-1' onChange={e => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} type='date' />
                                : <p className='text-gray-500'>{userData.dob}</p>
                        }
                    </div>
                </div>
                <div>
                    {
                        isEdit
                            ? <button className='border border-gray-300 py-1 px-5 rounded-2xl hover:bg-orange-500 hover:text-white transition-all' onClick={updateUserProfileData}>Save</button>
                            : <button className='border border-gray-300 py-1 px-5 rounded-2xl hover:bg-orange-500 hover:text-white transition-all' onClick={() => setIsEdit(true)}>Edit</button>
                    }
                </div>
            </div>
        </div>

    )
}

export default MyProfile