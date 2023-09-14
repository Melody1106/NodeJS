import {useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import jwt from "jwt-decode";

const useAuth = ()=>{
    const {setUser, token, setToken} = useContext(AuthContext);
    const appKey = "benbenbenTest01Token";
    const API_LOGIN = "http://localhost:3005/api/users/login";
    const API_LOGOUT = "http://localhost:3005/api/users/logout";

    const login = async (account, password)=>{
        try{
            const result = await axios.post(API_LOGIN, {account, password});
            setToken(result.data.token);
            const u = jwt(result.data.token);
            setUser(u);
            localStorage.setItem(appKey, result.data.token);
        }catch(error){
            //alert(error.response.data.error.error);
        }
    };

    const logout = async ()=>{
        try{
            await axios.post(API_LOGOUT, {},{
                headers:{
                    authorization: token
                }
            });
            setToken(null);
            setUser(undefined);
        }catch(error){
            alert(error.response.data.error.error);
        }
    };

    return {
        login,
        logout
    }

}

export default useAuth;