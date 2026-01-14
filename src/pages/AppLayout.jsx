import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AppLayout = () => {
    return (
        <>
        <Navbar />
        <main className="flex flex-col min-h-screen">
            <div className="flex-1">
            <Outlet />
            </div>
            <Footer />
        </main>
        </>
    );
};

export default AppLayout;