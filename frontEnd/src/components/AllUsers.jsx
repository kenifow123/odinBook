const url = import.meta.env.VITE_API_URL
import { useEffect, useContext, useState } from "react";
import { AppContext } from "./AppProvider.jsx";
import styles from "../styles.module.css";

const AllUsers = () => {
    const { jwt, user, } = useContext(AppContext);
    const [ allUsers, setAllUsers] = useState([]);
    const [ currFollowRequests, setCurrFollowRequests] = useState([]);
    const [ requestSent, setRequestSent] = useState([]);

    useEffect(() => {
        const getAllUsers = async () => {
            const response = await fetch(`${url}/api/account/allUsers`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${jwt}`,
                }
            });

            const data = await response.json();
            setAllUsers(data);
        }

        const getCurrFollowRequests = async () => {
            const response = await fetch(`${url}/api/account/getFollowRequests`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json();
            setCurrFollowRequests(data);
        }

        getAllUsers();
        getCurrFollowRequests();
        console.log('all users')
    }, [jwt, user]);

    const handleSendRequest = async (requestingId) => {
        const response = await fetch(`${url}/api/account/createFollowRequest/${requestingId}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${jwt}`,
                "Content-Type": "application/json",
            },
        })
        if (response.ok) {
            console.log('Follow request sent successfully')
            setRequestSent(prev => [...prev, requestingId]);
        }
    }

    return (
        <div className={styles.allUsersContainer}>
            <h1>All Users</h1>

            <div className={styles.allUsersDiv}>
                {allUsers.map((currUser) => (

                    <div className={styles.card}>
                        <img className={styles.userPic} src={currUser.profile.imageUrl} alt="profilePic"/>
                        <p>{currUser.username}</p>
                        {currUser.followedBy.find(follower => follower.id === user.id) ? (
                            <p>Already Following</p>
                        ) : currFollowRequests.find((request) =>
                            (request.requesterId === user.id &&
                            request.requestedId === currUser.id) ||
                            (request.requesterId === currUser.id &&
                            request.requestedId === user.id)
                        ) || requestSent.includes(currUser.id) ? ( <p>Request Already Sent</p>
                        ) : (
                                <button onClick={() => handleSendRequest(currUser.id)}>
                                    Send Follow Request
                                </button>
                        )}

                    </div>


                ))}
            </div>

        </div>
    )
}

export default AllUsers;