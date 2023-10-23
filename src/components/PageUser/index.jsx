import { Container } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";



export default function PageUser({}) {
    const { username } = useParams();
    const [user, setUser] = useState({});

    async function fetch() {
        try {
            const response = await axios.get(
                "https://76ztw3hm-3001.euw.devtunnels.ms/users?login=" + username
            );
            setUser(response.data[0]);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetch();
    },[]);

    return (
        <Container maxWidth="md">
            <div>
                {user.login == 'afirsov'?
                <span>Здарова, свин</span>:<span>{user.login}, welcome to your personal page</span>   
            }
                    

            </div>
        </Container>
    );
}
