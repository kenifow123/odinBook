const url = import.meta.env.VITE_API_URL;
import {useContext, useEffect} from "react";
import { AppContext } from "./AppProvider.jsx";
import { useNavigate } from "react-router-dom"


const Home = () => {
    const { jwt, user, setPosts } = useContext(AppContext);

    useEffect(() => {
        const getFollowedPosts = async () => {
            const response = await fetch(`${url}/api/post/allPosts`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwt}`,
                },
            })

            const data = await response.json();
            console.log(data);
        }

        getFollowedPosts();
    }, [jwt, user])

    return (
        <div>
            <h1>Home - Your Feed</h1>
        </div>
    )
}

export default Home;