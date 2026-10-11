import styles from '../styles.module.css'
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className={styles.header}>
            <p>header</p>
            <div className={styles.linksDiv}>
                <Link to="/home">Home</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
            </div>

        </div>
    )
}

export default Header;