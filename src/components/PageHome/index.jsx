import { Container } from "@mui/material";
import React from "react";
import cl from "./index.module.css";

export default function PageHome({ isLoggedIn, posts }) {
    return (
        <Container maxWidth="md">
            <div className={cl.homeWrap}>
                <span className={cl.title}>Welcome to HomePage</span>
                {isLoggedIn && posts.length > 0 ? (
                    <>
                        <span className={cl.text}>User is logged in</span>
                        <ul className={cl.postList}>
                            {posts.map((post) => (
                                <li key={post.id} className={cl.postItem}>
                                    <h5 className={cl.postTitle}>{post.title}</h5>
                                    <div className={cl.postText}>{post.body}</div>
                                </li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <span className={cl.text}>Login to see more...</span>
                )}
            </div>
        </Container>
    );
}
