import { Container } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function PageNotFound() {
    return (
        <Container>
            <span>Oooops...</span>
            <div>This page does not Exist</div>
            <span>Back to <Link to="/">Home Page</Link></span>
        </Container>
    );
}
