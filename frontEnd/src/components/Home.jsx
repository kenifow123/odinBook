const url = import.meta.env.VITE_API_URL;
import {useContext, useEffect, useState} from "react";
import { AppContext } from "./AppProvider.jsx";
import { useNavigate } from "react-router-dom"
import styles from "../styles.module.css"


const Home = () => {
    const { jwt, user, setPosts, posts } = useContext(AppContext);

    useEffect(() => {
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

        getFollowedPosts();
    }, [jwt, user])

    return (
        <div>
            <h1>Home - Your Feed</h1>
            <div className={styles.postsContainer}>
                {posts && (
                    posts.map((post) => (
                        <div key={post.id} className={styles.card}>
                            <div className={styles.authorDiv}>
                                <img className={styles.profilePic} src={post.author.profile.imageUrl} alt="profile img"/>
                                <p>{post.author.username}</p>

                            </div>
                            <p>{post.content}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default Home;