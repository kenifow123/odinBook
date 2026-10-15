const url = import.meta.env.VITE_API_URL;
import { AppContext } from "./AppProvider.jsx";
import { useContext } from "react";
import { useNavigate } from "react-router-dom"

const Login = () => {
    const { setUser, setJwt } = useContext(AppContext);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData(event.target);
        const response = await fetch(`${url}/api/account/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "username" : formData.get("username"),
                "password" : formData.get("password"),
            })
        })

        const data = await response.json();
        console.log(data);
        console.log('login success');
        setJwt(data.token);
        setUser(data.user);

        localStorage.setItem('jwt', data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate('/home')
    }

    const handleGuestLogin = async () => {
        const response = await fetch(`${url}/api/account/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "username" : 'a',
                "password" : 'a',
            })
        })

        const data = await response.json();
        console.log(data);
        console.log('login success');
        setJwt(data.token);
        setUser(data.user);

        localStorage.setItem('jwt', data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate('/home')
    }
    return (
        <div>
            <h1>Login</h1>

            <form method="POST" onSubmit={handleSubmit}>
                <label htmlFor="username">Username:<input type="text" name="username"/></label>
                <label htmlFor="password">Password:<input type="text" name="password"/></label>
                <button>Submit</button>
            </form>

            <button onClick={handleGuestLogin}>Guest Login</button>
        </div>
    )
}

export default Login;