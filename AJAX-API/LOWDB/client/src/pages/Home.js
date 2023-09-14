import React, {useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import useAuth from "../hooks/useAuth";

export const Home = ()=>{
    const {user} = useContext(AuthContext);
    const {logout} = useAuth();


    return(
        <div className="Home container mt-3">
            <div className="d-flex">
                <div className="head d-flex flex-column">
                    <img className="rounded-circle mb-2" src={user.head} alt="IMH_HERE" />
                    <div className="btn btn-primary" onClick={logout}>Logout</div>
                </div>
                <div className="ms-2">
                    <h1>{user.name}</h1>
                    <div className="fs-3">{user.account}</div>
                    <div>{user.mail}</div>
                </div>
            </div>
        </div>
    )
}