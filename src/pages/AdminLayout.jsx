import { ChevronLeft } from "lucide-react";
import AdminNav from "../components/AdminNav";
import { Outlet, useNavigate } from "react-router-dom";
import { VolunteerProvider } from "../context/VolunteerContext";

const AdminLayout = () => {
  const navigate = useNavigate();

  return (
    <main className={`px-2 bg-blue-400 h-screen overflow-auto`}>
      <button onClick={() => navigate("/")} className="bg-white mt-2 text-black px-3 rounded-sm shadow-sm flex justify-content-evenly items-center"><ChevronLeft /> Back to Home</button>
      <section className={`flex py-2 w-full h-full gap-2`}>
        <AdminNav />
        <div className={`flex-1 bg-white rounded-md text-black`}>
          <VolunteerProvider>
          <Outlet />
          </VolunteerProvider>
        </div>
      </section>
    </main>
  );
};

export default AdminLayout;
