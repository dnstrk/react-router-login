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
import PageNotFound from "./components/PageNotFound";

const initialState = {
    users: {},
    posts: {},
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
        case "FETCH_USERS":
            return {
                ...state,
                users: action.payload,
                isLoading: false,
            };
        case "FETCH_POSTS":
            return {
                ...state,
                posts: action.payload,
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
                isLoggedIn: action.payload,
            };
    }
}

async function fetch(dispatch) {
    try {
        const responseUsers = await axios.get("http://localhost:3001/users");
        const responsePosts = await axios.get("http://localhost:3001/posts");
        dispatch({ type: "FETCH_USERS", payload: responseUsers.data });
        dispatch({ type: "FETCH_POSTS", payload: responsePosts.data });
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
    const [privacy, setPrivacy] = useState();

    useEffect(() => {
        fetch(dispatch);
    }, []);

    function randomPrivacy() {
        const alpt = "abcdefghijklmnopqrstuvwxyz";
        let varPrivacy = "";
        while (varPrivacy.length < 6) {
            varPrivacy += alpt[Math.floor(Math.random() * alpt.length)];
        }
        return varPrivacy;
    }

    useEffect(() => {
        setPrivacy(randomPrivacy());
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

    return (
        <>
            <Header
                isLoggedIn={state.isLoggedIn}
                logonUser={state.logonUser}
                privacy={privacy}
                setPrivacy={setPrivacy}
                randomPrivacy={randomPrivacy}
                dispatch={dispatch}
            />
            <Routes>
                <Route
                    path="/"
                    element={
                        <PageHome
                            isLoggedIn={state.isLoggedIn}
                            posts={state.posts}
                        />
                    }
                />
                <Route path="/about" element={<PageAbout />} />
                <Route
                    path="/FormLogin"
                    element={
                        <FormLogin
                            currentUser={currentUser}
                            setCurrentUser={setCurrentUser}
                            logonUser={state.logonUser}
                            dispatch={dispatch}
                            privacy={privacy}
                            setPrivacy={setPrivacy}
                            randomPrivacy={randomPrivacy}
                        />
                    }
                />
                <Route path="/FormRegister" element={<FormRegister />} />
                <Route
                    path={"/" + privacy + "/:username"}
                    element={<PageUser currentUser={currentUser} />}
                />

                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </>
    );
}

export default App;
