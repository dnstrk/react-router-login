import React from "react";
import cl from './index.module.css'
import { Container } from "@mui/material";
import { Link } from "react-router-dom";


export default function FormRegister() {
    function test() {
        console.log(1)
    }

    return (
        <Container maxWidth="md">
            <div className={cl.formWrap}>
                <div>Register</div>
                <div className={cl.inputForm}>
                    <div className={cl.uName}>
                        <span>Username:</span>
                        <input type="text" />
                    </div>
                    <div className={cl.pass}>
                        <span>Password:</span>
                        <input type="Password" />
                    </div>
                    <div className={cl.pass}>
                        <span>Repeat password:</span>
                        <input type="Password" />
                    </div>
                    <div className={cl.action}>
                        <Link to="/FormLogin">
                        <button onClick={test} className={cl.submit}>Submit</button>
                        </Link>
                    </div>
                </div>
            </div>
        </Container>
    );
}
