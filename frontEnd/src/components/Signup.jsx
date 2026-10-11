

const Signup = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
    }
    return (
        <div>
            <h1>Signup</h1>

            <form method="POST" onSubmit={handleSubmit}>
                <label htmlFor="username">Username:<input type="text" name="username"/></label>
                <label htmlFor="password">Password:<input type="text" name="password"/></label>
                <label htmlFor="email">Email:<input type="text" name="email"/></label>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default Signup;