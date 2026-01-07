import { useState } from "react";
import { registerUser } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const {storeToken} = useAuth();
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

    const response = await registerUser(user);
    
    if (response.ok) {
        alert(response.msg);
        storeToken(response.token);
        navigate("/");
        setUser({
            username: "",
            email: "",
            phone: "",
            password: "",
        });
    } else {
        alert(response.msg || response.message);
    }
  };

  return (
    <main className={`bg-blue-400 pt-28 h-screen`}>
      <section className={`flex px-[4.2rem]`}>
        <div className={`w-[50vw] text-center`}>
          <img className={`w-125`} src="/images/register.png" alt="" />
        </div>

        <div className={`w-[50vw] bg-white text-black py-2 px-4 rounded-md`}>
          <div>
            <h2 className={`text-[2rem] text-center`}>Register</h2>
          </div>
          <div className={`p-4`}>
            <form onSubmit={handleSubmit}>
              <div className={`mb-4`}>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  placeholder="enter your username"
                  required
                  name="username"
                  value={user.username}
                  onChange={handleChange}
                  className="w-full outline py-1 px-2 rounded-md focus:outline-green-400 focus:outline-2"
                />
              </div>
              <div className={`mb-4`}>
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
              <div className={`mb-4`}>
                <label htmlFor="phone">Phone no.</label>
                <input
                  type="number"
                  placeholder="enter your phone"
                  required
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  className="w-full outline py-1 px-2 rounded-md focus:outline-green-400 focus:outline-2"
                />
              </div>
              <div className={`mb-4`}>
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
                  className={`bg-green-500 text-white px-2 py-1 rounded-md`}
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Register;
