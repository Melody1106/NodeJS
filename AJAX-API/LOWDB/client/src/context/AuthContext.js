import React, {createContext, useState} from "react";

export const AuthContext = createContext({user: undefined});

export const AuthProvider = ({children})=>{
    const [user, setUser] = useState(undefined);
    const [token,setToken] = useState(null)

    return(
        <AuthContext.Provider value={{user, setUser,token, setToken}}>
            {children}
        </AuthContext.Provider>
    )

}