import { Container } from "@mui/material";
import cl from "./index.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function FormLogin({
    currentUser,
    setCurrentUser,
    logonUser,
    dispatch,
}) {
    const [check, setCheck] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setCheck(true);
        }, 2000);
    }, [check]);

    function checker() {
        setCheck(false);
    }

    function login() {
        setCurrentUser({ ...currentUser, login: "", password: "" });
        dispatch({ type: "USER_LOGON", payload: true });
    }

    return (
        <Container maxWidth="md">
            <div className={cl.formWrap}>
                <div>Login</div>
                <div className={cl.inputForm}>
                    <div className={cl.uName}>
                        <span>Login:</span>
                        <input
                            type="text"
                            value={currentUser.login}
                            onChange={(e) => {
                                setCurrentUser({
                                    ...currentUser,
                                    login: e.target.value,
                                });
                            }}
                        />
                    </div>
                    <div className={cl.pass}>
                        <span>Password:</span>
                        <input
                            type="password"
                            value={currentUser.password}
                            onChange={(e) => {
                                setCurrentUser({
                                    ...currentUser,
                                    password: e.target.value,
                                });
                            }}
                        />
                    </div>
                    {check ? null : <span className={cl.alert}>Not found</span>}
                    <div className={cl.action}>
                        <Link to="/FormRegister">
                            <button className={cl.register}>Register</button>
                        </Link>
                        {currentUser.login == logonUser ? (
                            <Link to={"/" + logonUser}>
                                <button className={cl.login} onClick={login}>
                                    Login
                                </button>
                            </Link>
                        ) : (
                            <button className={cl.login} onClick={checker}>
                                Login
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </Container>
    );
}
