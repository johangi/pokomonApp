import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
    const { user } = useAuthContext();
    const { logout } = useLogout();
    const handleClick = () => {
        logout();
    }

    return (
        <header>
            <div className="container">
                <h1 className="white"><Link to="/" className="white">Logo</Link></h1>
                <Link to={user && "/home/" + user.username}>
                    <h1 className="kicksHub">{user && <span>{user.username} - </span>}Chinpokomon</h1>
                </Link>
                <nav>
                    {user && (
                        <div>
                            <button onClick={handleClick}>Log out</button>
                        </div>)}
                    {!user && (
                        <div>
                            <Link to="/login" id="login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </div>)}
                </nav>
            </div>
        </header>
    );
}

export default Navbar;