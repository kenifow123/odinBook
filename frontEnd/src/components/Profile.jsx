import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from './AppProvider.jsx'
import styles from '../styles.module.css'
import defaultPic from '../assets/defaultAvatar.jpg';
import defaultAvatar from "../assets/defaultAvatar.jpg";
const url = import.meta.env.VITE_API_URL

const Profile = () => {
    const { jwt, user, setUser, posts} = useContext(AppContext);

    const formatDate = (date) => {
        return new Date(date).toLocaleString([], {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
        })
    }

    const handleEditPic = async (event) => {
        event.preventDefault()
        const navigate = useNavigate();
        const formData = new FormData(event.target);
        const response = await fetch(`${url}/api/profile/changeProfilePic`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
            body: formData,
        })
        const data = await response.json();

        setUser((prev) => ({ ...prev, profile: data }))

        navigate('/profile');

    }

    return (
        <>
            <h1>Profile Page</h1>
            <div className={styles.profileDiv}>
                <h3>{user.username}</h3>
                <img src={user.profile?.imageUrl || defaultPic} alt="" className={styles.profileImg}/>

                <form onSubmit={handleEditPic}>
                    <label htmlFor="file">Choose Picture: <input type="file" name="file"/></label>
                    <button>Upload</button>
                </form>

                <div className={styles.userPostsContainer}>
                    {posts.map((post) => (
                        (post.authorId === user.id && (
                            <div key={post.id} className={styles.card}>
                                <div className={styles.authorDiv}>
                                    <img className={styles.profilePic} src={post.author.profile?.imageUrl || defaultAvatar} alt="profile img"/>
                                    <p>{post.author.username}</p>
                                </div>

                                <p>{formatDate(post.createdAt)}</p>
                                <p>{post.content}</p>

                                <p>Likes: {post.usersLiked.length}</p>
                            </div>
                        ))

                    ))}
                </div>

            </div>

        </>
    )
}

export default Profile;