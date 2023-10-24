import { Container } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import cl from './index.module.css'

export default function PageUser({}) {
    const { username } = useParams();
    const [user, setUser] = useState({});

    async function fetch() {
        try {
            const response = await axios.get(
                "http://localhost:3001/users?login=" + username
            );
            setUser(response.data[0]);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetch();
    }, []);

    function test() {
        console.log(user)
    }

    return (
        <Container maxWidth="md">
            <div className={cl.userWrap}>
                <span>{user.login}, welcome to your personal page</span>
                <button onClick={test}>test</button>
            </div>
        </Container>
    );
}
