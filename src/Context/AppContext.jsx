import { createContext } from "react";

export const AppContext = createContext()

export const AppContextProvider = (props)=>{

    const backendUrl = 'https://localhost:4000'

    const value={
        backendUrl
    }
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}