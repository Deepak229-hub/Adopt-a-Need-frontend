import AdminNav from "../components/AdminNav";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <main className={`px-2 bg-blue-400 h-screen`}>
      <section className={`flex py-2 w-full h-full gap-2`}>
        <AdminNav />
        <div className={`flex-1 bg-white rounded-md text-black`}>
          <Outlet />
        </div>
      </section>
    </main>
  );
};

export default AdminLayout;
