const url = import.meta.env.VITE_API_URL
import { AppContext } from "./AppProvider.jsx"
import { useContext, useState, useEffect } from "react";
import styles from '../styles.module.css'

const FollowRequests = () => {
    const { jwt , user } = useContext(AppContext);
    const [ followRequests, setFollowRequests ] = useState([]);

    const getFollowRequests = async () => {
        const response = await fetch(`${url}/api/account/requestedUserFollowRequests`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
            }
        });

        const data = await response.json();
        console.log(data);
        setFollowRequests(data);

    }

    const handleAcceptClick = async (followerUserId, followRequestId) => {
        const response = await fetch(`${url}/api/account/acceptFollow/${followerUserId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
            }
        })

        const data = await response.json();
        console.log(data);
        console.log('accepted follow');
        handleDeclineClick(followRequestId);

        getFollowRequests();
    }

    const handleDeclineClick = async (followRequestId) => {
        const response = await fetch(`${url}/api/account/deleteFollowRequest/${followRequestId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        })

        const data = await response.json();
        console.log(data);
        getFollowRequests();
    }

    useEffect(() => {
        getFollowRequests();
    }, [jwt])

    return (
        <div className={styles.followRequestsContainer}>
            <h1>Your Follow Requests</h1>
            {followRequests && (
                <div className={styles.followRequestsDiv}>
                    {followRequests.map((request) => (
                        <div key={request.id} className={styles.followRequestCard}>
                            <p>Request from: {request.requester.username}</p>
                            <img src={request.requester.profile.imageUrl} alt=""/>
                            <button onClick={() => handleAcceptClick(request.requester.id, request.id)}>Accept</button>
                            <button onClick={() => handleDeclineClick(request.id)}>Decline</button>
                        </div>
                    ))}
                </div>
            )}


        </div>
    )

}

export default FollowRequests;