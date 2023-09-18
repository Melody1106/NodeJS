import React, {createContext, useState, useEffect} from "react";
import jwt from "jwt-decode";
import axios from "axios";

//新增一組context
export const AuthContext = createContext({user: undefined});

//製作一組provider,包住子層物件的內容
export const AuthProvider = ({children})=>{
    const appKey = "benbenbenTest01Token";
    const API_STATUS = "http://localhost:3005/api/users/status";
    const [user, setUser] = useState(undefined);
    const [token, setToken] = useState(localStorage.getItem(appKey));

    //當 token 有變化時，則將 token 解析變成物件，並設定成 user
//這樣登入過一次後，關掉瀏覽器後，再重新進來這頁，就會直接進到 Home 當中
    useEffect(() => {
        let checkLoginStatus = async()=>{
            if (token) {

                // const decodedToken = jwt(token);
                 //setUser(decodedToken);
                try{
                    const result = await axios.post(
                        API_STATUS,
                        {},
                        {
                            headers: {
                                authorization: token
                            }
                        }
                    )
                    if(result.status === 200){
                        setToken(result.data.token);
                        setUser(jwt(token));
                    }else{
                        alert(result.data.message);
                        localStorage.removeItem(appKey);
                        setToken(null);
                        setUser(undefined);
                    }
                }catch(error){
                    console.log(error);
                localStorage.removeItem(appKey);
                setToken(null);
                setUser(undefined);
                }
               }
        }
       checkLoginStatus()
        // (async ()=>{})();

      }, [token]);

    return(
        <AuthContext.Provider value={{user, setUser, token, setToken}}>
            {children}
        </AuthContext.Provider>
    );
}
