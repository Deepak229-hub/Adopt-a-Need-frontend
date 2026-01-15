import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {CircleUserRound} from "lucide-react";

const Navbar = () => {
    const {isLoggedIn, userData} = useAuth();
    return (
        <header className={`fixed top-0 left-0 right-0 w-full backdrop-blur-2xl z-50 text-black`}>
            <nav className={`flex py-[2.4rem] px-[4.2rem] justify-between`}>
                <div>
                    <Link to={"/"}><img src="/images/Logo.png" alt="adopt-a-need logo" className={`h-9`}></img></Link>
                </div>
                <div>
                    <ul className={`flex gap-6`}>
                        <li><NavLink to={"/"}>Home</NavLink></li>
                        <li><NavLink to={"/about"}>About</NavLink></li>
                        <li><NavLink to={"/donate"}>Donate</NavLink></li>
                        {isLoggedIn ? <>
                        <li><NavLink to={"/logout"}>Logout</NavLink></li>
                        {userData.isadmin ? 
                        <li><NavLink to={"/admin"}>Admin</NavLink></li> :
                        <li><NavLink to={"/profile"}><CircleUserRound /></NavLink></li>
                        }
                        </> : 
                        <>
                        <li><NavLink to={"/register"}>Register</NavLink></li>
                        <li><NavLink to={"/login"}>Login</NavLink></li>
                        </>}
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;