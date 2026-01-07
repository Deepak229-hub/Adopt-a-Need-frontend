import { useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { Navigate } from "react-router-dom";

const Logout = () => {
    const {logOutUser} = useAuth();

    useEffect(() => {
        logOutUser();
    }, [logOutUser]);

    return <Navigate to={"/login"} />
}

export default Logout;