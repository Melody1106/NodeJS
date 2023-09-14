import React, {useRef} from "react";
import useAuth from "../hooks/useAuth";


export const LoginForm = ()=>{
    const accountRef = useRef();
    const passwordRef = useRef();
    const {login} = useAuth();
    const handLogin = ()=>{
        const account = accountRef.current.value;
        const password = passwordRef.current.value;
        login(account, password);
    }

    return(
        <div className="LoginForm container mt-3">
            <div className="input-group mb-1">
                <span className="input-group-text">Account</span>
                <input ref={accountRef} type="text" className="form-control" />
            </div>
            <div className="input-group mb-1">
                <span className="input-group-text">Password</span>
                <input ref={passwordRef} type="password" className="form-control" />
            </div>
            <div className="btn btn-primary" onClick={handLogin}>Login</div>
        </div>
    )
}