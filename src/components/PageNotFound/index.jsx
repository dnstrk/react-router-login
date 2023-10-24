import { Container } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import cl from './index.module.css'

export default function PageNotFound() {
    return (
        <Container>
            <div className={cl.notFoundWrap}>
                <b className={cl.title}>Oooops...</b>
                <b className={cl.text}>This page does not Exist</b>
                <b className={cl.text}>
                    Back to <Link to="/"><span className={cl.homeLink}>Home Page</span></Link>
                </b>
            </div>
        </Container>
    );
}
