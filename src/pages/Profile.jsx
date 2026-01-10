import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateUser } from "../api/auth";

const Profile = () => {
  let { userData, token, setUserData, storeToken } = useAuth();
  const [user, setUser] = useState({
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (userData?.email) {
      setUser({
        email: userData.email,
        phone: userData.phone,
      });
    }
  }, [userData]);

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

    const response = await updateUser(user, token);
    if (response.ok) {
      alert(response.msg);
      storeToken(response.token);
    } else {
      alert("an error occured");
    }
  };

  return (
    <main className={`pt-28 h-screen bg-blue-400 px-[4.2rem]`}>
      <section className={`bg-white rounded-md text-black p-4`}>
        <div>
          <div className={`my-3`}>
            <h2 className={`text-3xl font-bold`}>{userData.username}</h2>
          </div>

          <hr className={`border-gray-400`} />

          <div className={`my-3 flex gap-4`}>
            <div>
              <div className={`my-2`}>
                <h3 className={`text-xl font-bold text-center`}>Information</h3>
              </div>
              <form onSubmit={handleSubmit}>
                <div className={`grid grid-cols-[1fr_2fr]`}>
                  <div className={`my-2`}>
                    <p className={`font-bold`}>Email: </p>
                  </div>
                  <div className={`my-2 text-right`}>
                    <input
                      type="text"
                      value={user.email}
                      name="email"
                      onChange={handleChange}
                      className={`outline-2 rounded-md px-2 text-right`}
                    />
                  </div>
                  <div className={`my-2`}>
                    <p className={`font-bold`}>Phone: </p>
                  </div>
                  <div className={`my-2 text-right`}>
                    <input
                      type="text"
                      value={user.phone}
                      name="phone"
                      onChange={handleChange}
                      className={`outline-2 rounded-md px-2 text-right`}
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className={`bg-green-500 text-white py-1 rounded-md px-3`}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className={`flex-1 border-l border-gray-400 `}>
              <div>
                <h3 className={`text-center text-xl font-bold`}>
                  Adoption Application
                </h3>
              </div>
              <div className={`p-3`}>
                No application yet
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Profile;
