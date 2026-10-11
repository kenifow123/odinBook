import Post from "./Post.jsx";

const url = import.meta.env.VITE_API_URL;
import {useContext, useEffect, useState} from "react";
import { AppContext } from "./AppProvider.jsx";
import { useNavigate } from "react-router-dom"
import styles from "../styles.module.css"


const Home = () => {
    const { jwt, user, setPosts, posts } = useContext(AppContext);
    const getFollowedPosts = async () => {
        const response = await fetch(`${url}/api/post/allPosts`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`,
            },
        })

        const data = await response.json();
        console.log(data)
        setPosts(data);
    }
    useEffect(() => {
        getFollowedPosts();
    }, [jwt, user])

    const handleLikeClick = async (postId) => {
        const response = await fetch(`${url}/api/post/likePost/${postId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`,
            }
        })

        const data = await response.json();
        console.log(data)
        getFollowedPosts();
    }

    const handleCommentSubmit = async (event, postId) => {
        event.preventDefault()
        const formData = new FormData(event.target);

        const response = await fetch(`${url}/api/post/createComment/${postId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`,
            },
            body: JSON.stringify({
                content: formData.get("comment")
            }),
        })

        const data = await response.json();
        getFollowedPosts();
        console.log(data);
    }

    return (
        <div>
            <h1>Home - Your Feed</h1>
            <div className={styles.postsContainer}>
                {posts && (
                    posts.map((post) => (
                        <Post key={post.id} post={post} onLike={handleLikeClick} onComment={handleCommentSubmit} />
                    ))
                )}
            </div>
        </div>
    )
}

export default Home;