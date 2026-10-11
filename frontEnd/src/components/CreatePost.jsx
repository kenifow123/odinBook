const url = import.meta.env.VITE_API_URL
import { useContext } from "react";
import { AppContext } from "./AppProvider.jsx"
import styles from "../styles.module.css"

const CreatePost = () => {
    const { jwt, user } = useContext(AppContext);

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const response = await fetch(`${url}/api/post/createPost`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
            body: formData,
            })
        const data = await response.json()
        console.log(data);
    }


    return (
        <>
            <h1>Create Post</h1>

            <form onSubmit={handleSubmit} method="POST">
                <label htmlFor="content">Content:<input type="text" name="content"/></label>
                <label htmlFor="file"><input type="file" name="file"/></label>
                <button>Submit</button>
            </form>

        </>
    )
}

export default CreatePost;