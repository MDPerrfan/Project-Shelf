import { createContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify'
export const AppContext = createContext()

export const AppContextProvider = (props) => {

    const backendUrl = 'https://projectshowserver.onrender.com'
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userData, setUserData] = useState(null);
    const [projectData, setProjectData] = useState(null);

    axios.defaults.withCredentials = true;

    // ✅ Fetch auth state and user data on page load
    const getAuthState = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/is-auth`);
            if (data.success) {
                setIsLoggedin(true);
                const user = await getUserData(); // ✅ Fetch user data when user is authenticated
                if (user) setUserData(user);
            } else {
                setIsLoggedin(false);
                setUserData(null);
            }
        } catch (error) {
            console.error("Auth Check Error:", error);
            setIsLoggedin(false);
            setUserData(null);
        }
    };

    // ✅ Modify getUserData to return user data
    const getUserData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/data`);
            if (data.success) {
                setUserData(data.userData);
                return data.userData; // ✅ Return user data so it can be used immediately
            } else {
                toast.error(data.message);
                return null;
            }
        } catch (error) {
            console.error("User Data Fetch Error:", error);
            toast.error(error.message);
            setUserData(null);
            return null;
        }
    };
    const getProjectsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/project/get')
            if (data) {
                setProjectData(data);
            }
        } catch (error) {
            console.error("User Data Fetch Error:", error);
            toast.error(error.message);
            setProjectData(null);
            return null;
        }
    }
    useEffect(() => {
        getAuthState();
        getProjectsData();
    }, []);
    const value = {
        backendUrl,
        isLoggedin,
        setIsLoggedin,
        userData,
        setUserData,
        getUserData,
        projectData

    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}