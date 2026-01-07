import { Link } from "react-router-dom";
import Home from "./Home";

const PageNotFound = () => {
    return (
        <main className={`pt-28 bg-blue-400 h-screen text-center`}>
            <h2 className={`text-[4rem] font-bold py-6`}>404</h2>
            <p>Page not found</p>
            <div className={`my-5`}>
                <Link className={`bg-white text-black py-1 px-3 rounded-md`} to="/">Home</Link>
            </div>
        </main>
    );
};

export default PageNotFound;