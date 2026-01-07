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

const App = () => {
  const {isLoggedIn} = useAuth();

  return (
    <>
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/donate" element={<Donate />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/profile" element={isLoggedIn ? <Profile /> : <Login />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
    <Footer />
    </BrowserRouter>
    </>
  );
};

export default App;