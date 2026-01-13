import { useState } from "react";
import { loginUser } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const {storeToken, loading, setLoading} = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({
        ...user,
        [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await loginUser(user);
    
    if(response.ok) {
        alert(response.msg);
        storeToken(response.token);
        setLoading(false);
        navigate("/");
        
        setUser({
            email: "",
            password: "",
        });
    } else {
        alert(response.msg || response.message);
    }
  }

  return (
    <main className={`bg-blue-400 pt-28 h-screen`}>
      <section className={`flex px-[4.2rem]`}>
        <div className={`w-[50vw] text-center`}>
          <img className={`w-125`} src="/images/login.png" alt="" />
        </div>

        <div
          className={`w-[50vw] flex flex-col bg-white text-black py-2 px-4 rounded-md`}
        >
          <div>
            <h2 className={`text-[2rem] text-center`}>Login</h2>
          </div>
          <div className={`p-4 flex flex-col flex-1 justify-center`}>
            <form onSubmit={handleSubmit}>
              <div className={`mb-10`}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  placeholder="enter your email"
                  required
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="w-full outline py-1 px-2 rounded-md focus:outline-green-400 focus:outline-2"
                />
              </div>
              <div className={`mb-10`}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  placeholder="enter your password"
                  required
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  className="w-full outline py-1 px-2 rounded-md focus:outline-green-400 focus:outline-2"
                />
              </div>
              <div className={`my-4`}>
                <button
                  className={`text-white px-2 py-1 rounded-md ${loading ? 'bg-green-600 disabled' : 'bg-green-500'}`}
                  type="submit"
                >
                  {loading ? 'Logging in...' : 'Log in'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
