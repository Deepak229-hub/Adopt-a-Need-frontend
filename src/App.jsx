import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Donate from "./pages/Donate";
import PageNotFound from "./pages/PageNotFound";
import Logout from "./pages/Logout";
import Profile from "./pages/Profile";
import { useAuth } from "./context/AuthContext";
import Footer from "./components/Footer";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLayout from "./pages/AdminLayout";
import Children from "./pages/Children";
import Volunteer from "./pages/Volunteer";
import AppLayout from "./pages/AppLayout";

const App = () => {
  const {isLoggedIn, userData} = useAuth();

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route element={<AppLayout />} >
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/donate" element={<Donate />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/profile" element={isLoggedIn ? <Profile /> : <Login />} />
      </Route>
      <Route path="/admin" element={userData.isadmin ? <AdminLayout /> : <Login />}>
        <Route index element={<AdminDashboard />} />
        <Route path="children" element={<Children />} />
        <Route path="volunteer" element={<Volunteer />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
    </BrowserRouter>
    </>
  );
};

export default App;