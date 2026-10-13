const url = import.meta.env.VITE_URL_API
import {useContext, useEffect, useState} from "react";
import { AppContext } from "./AppProvider.jsx";
import styles from "../styles.module.css"
import defaultAvatar from '../assets/defaultAvatar.jpg'



const Post = ({post, onLike, onComment}) => {
    const [showComments, setShowComments] = useState(false);
    // const [comments, setComments] = useState([]);
    const { jwt, user } = useContext(AppContext);

    const formatDate = (date) => {
        return new Date(date).toLocaleString([], {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
        })
    }

    return (
        <>
            <div key={post.id} className={styles.card}>
                <div className={styles.authorDiv}>
                    <img className={styles.profilePic} src={post.author.profile?.imageUrl || defaultAvatar} alt="profile img"/>
                    <p>{post.author.username}</p>
                </div>

                <p>{formatDate(post.createdAt)}</p>

                <img src={post.imageUrl} alt=""/>
                <p>{post.content}</p>

                <div className={styles.likesDiv}>
                    <p>Likes: {post.usersLiked.length}</p>
                    <button onClick={() => onLike(post.id)} className={styles.likeButton}>Like Post</button>
                </div>

                <form method="POST" onSubmit={(event) => {
                    event.preventDefault();
                    onComment(event, post.id);
                }}>
                    <label htmlFor="comment">Comment: <input type="text" name="comment"/></label>
                    <button>Comment</button>
                </form>

                <button onClick={() => setShowComments(prev => !prev)}>{showComments ? 'Hide Comments' : 'Show Comments'}</button>
                {showComments && (
                    <div className={styles.commentsContainer}>
                        {post.comments?.length > 0 && (
                            post.comments.map((comment) => (
                                <div key={comment.id}>
                                    <div className={styles.authorDiv}>
                                        <img className={styles.profilePic} src={comment.author.profile?.imageUrl || defaultAvatar} alt="Profile"/>
                                        <p>{comment.author.username}</p>
                                    </div>
                                    <p>{formatDate(comment.createdAt)}</p>
                                    <p>{comment.content}</p>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </>
    )
}

export default Post;