import axios from "axios";
import "./App.css";
import { useEffect, useReducer, useState } from "react";
import { Route, Routes, useParams } from "react-router";
import PageHome from "./components/PageHome";
import PageAbout from "./components/PageAbout";
import PageUser from "./components/PageUser";
import FormLogin from "./components/FormLogin";
import FormRegister from "./components/FormRegister";
import Header from "./components/Header";

const initialState = {
    users: {},
    err: false,
    isLoading: true,
    logonUser: null,
    isLoggedIn: false,
    newUser: {
        login: "",
        password: "",
    },
};

function reducer(state, action) {
    switch (action.type) {
        case "FETCH_SUCCESS":
            return {
                ...state,
                users: action.payload,
                isLoading: false,
            };
        case "FETCH_ERROR":
            return {
                ...state,
                err: action.payload,
            };
        case "LOGIN":
            return {
                ...state,
                logonUser: action.payload,
            };
        case "USER_LOGON":
            return {
                ...state,
                isLoggedIn: action.payload
            }
    }
}

async function fetch(dispatch) {
    try {
        const response = await axios.get("https://76ztw3hm-3001.euw.devtunnels.ms/users");
        setTimeout(() => {
            dispatch({ type: "FETCH_SUCCESS", payload: response.data });
        }, 2000);
    } catch (e) {
        dispatch({ type: "FETCH_ERROR", payload: e.message });
    }
}

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [currentUser, setCurrentUser] = useState({
        login: "",
        password: "",
    });

    useEffect(() => {
        fetch(dispatch);
    }, []);

    useEffect(() => {
        if (state.users.length > 0) {
            state.users.map((u) => {
                if (
                    u.login == currentUser.login &&
                    u.password == currentUser.password
                ) {
                    dispatch({ type: "LOGIN", payload: u.login });
                }
            });
        }
    }, [currentUser]);

    console.log(state.isLoggedIn)

    return (
        <>
            <Header isLoggedIn={state.isLoggedIn} dispatch={dispatch}/>

            <Routes>
                <Route path="/" element={<PageHome />} />
                <Route path="/about" element={<PageAbout />} />
                <Route
                    path="/FormLogin"
                    element={
                        <FormLogin
                            currentUser={currentUser}
                            setCurrentUser={setCurrentUser}
                            logonUser={state.logonUser}
                            dispatch={dispatch}
                        />
                    }
                />
                <Route path="/FormRegister" element={<FormRegister />} />
                <Route path="/:username" element={<PageUser currentUser={currentUser}/>} />
                <Route path="*" />
            </Routes>
        </>
    );
}

export default App;
