import { Container } from "@mui/material";
import React from "react";
import cl from "./index.module.css";

export default function PageAbout() {
    return (
        <Container maxWidth="md">
            <div className={cl.aboutWrap}>
                <span className={cl.title}>About Page</span>
            </div>
        </Container>
    );
}
