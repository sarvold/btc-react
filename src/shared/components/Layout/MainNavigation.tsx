import { Link } from 'react-router-dom';
import { useContext } from 'react';
import classes from './MainNavigation.module.css';
import AuthContext from '../../../context/auth-context';

const MainNavigation: React.FC = () => {
    const authCtx = useContext(AuthContext);

    const isLoggedIn = authCtx.isLoggedIn;

    const logoutHandler = () => {
        authCtx.logout();
    }
    return (
        <header className={classes.header}>
            <img
                className={classes.logo}
                src="https://zeply.com/wp-content/uploads/Full-Logo-Black.svg"
                alt="Zeply"
            ></img>
            <nav>
                <ul>
                    {!isLoggedIn && (
                        <li>
                            <Link to='/auth'>Login</Link>
                        </li>
                    )}
                    {isLoggedIn && (
                        <li>
                            <Link to='/btc'>Blockchain Info</Link>
                        </li>
                    )}
                    {isLoggedIn && (
                        <li>
                            <button onClick={logoutHandler}>Logout</button>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default MainNavigation;
