import React from "react";
import { Link } from "react-router-dom";
import cl from "./index.module.css";
import { Container } from "@mui/material";

export default function Header({ isLoggedIn, dispatch, setPrivacy, randomPrivacy }) {
    function logout() {
        setPrivacy(randomPrivacy())
        dispatch({type: "USER_LOGON", payload: false})

    }

    return (
        <header className={cl.header}>
            <Container>
                <div className={cl.headerWrap}>
                    <span>JSON-server</span>
                    <nav className={cl.nav}>
                        <ul className={cl.navList}>
                            <li className={cl.navItem}>
                                <Link to="/">Home</Link>
                            </li>
                            <li className={cl.navItem}>
                                <Link to="/about">About</Link>
                            </li>
                        </ul>
                    </nav>
                    {isLoggedIn ? (
                        <Link to="/FormLogin">
                            <button className={cl.login} onClick={logout}>Logout</button>
                        </Link>
                    ) : (
                        <Link to="/FormLogin">
                            <button className={cl.login}>Login</button>
                        </Link>
                    )}
                </div>
            </Container>
        </header>
    );
}
