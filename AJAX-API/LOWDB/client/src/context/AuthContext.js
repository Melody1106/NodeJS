import React, {createContext, useState} from "react";

//新增一組context
export const AuthContext = createContext({user: undefined});

//製作一組provider,包住子層物件的內容
export const AuthProvider = ({children})=>{
    const [user, setUser] = useState(undefined);
    const [token, setToken] = useState(null);

    return(
        <AuthContext.Provider value={{user, setUser, token, setToken}}>
            {children}
        </AuthContext.Provider>
    );
}
