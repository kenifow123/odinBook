import { Outlet, Navigate } from 'react-router-dom';
import Header from './Header.jsx';
import styles from '../styles.module.css';


const Authenticated = () => {

    return (
        <div className={styles.authenticated}>
            <Header />
            <Outlet/>

        </div>
    )
}

export default Authenticated;