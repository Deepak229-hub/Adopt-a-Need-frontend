import React from "react";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { createChild, getChildren } from "../api/children";
import { Edit, Trash2 } from "lucide-react";

const Children = () => {
  const [children, setChildren] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [child, setChild] = useState({
    name: "",
    dob: "",
    gender: "MALE",
    status: "ACTIVE",
  });
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getChildrenInfo() {
      const res = await getChildren(token);
      setChildren(res);
      setLoading(false);
    }
    getChildrenInfo();
  }, [child]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setChild({
      ...child,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await createChild(child, token);
    if (response.ok) {
      alert("New Child Added!");
      setChild({
        name: "",
        dob: "",
        gender: "MALE",
        status: "ACTIVE",
      });
    } else alert("An error occured.");
  };

  return (
    <section className={`p-3 flex flex-col gap-5 overflow-y-scroll h-full`}>
      <div>
        <button
          onClick={() => setShowAdd((prev) => !prev)}
          className={`bg-green-500 text-white py-1 px-3 rounded-md shadow-md`}
        >
          Add Child
        </button>
      </div>
      {showAdd && (
        <div className={`w-[50%]`} id="addChild">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="enter the child's name"
                className={`w-full outline-gray-400 outline-2 rounded-md px-2 py-1 mt-1 focus:outline-3 focus:outline-green-500`}
                value={child.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="dob">Date of Birth</label>
              <input
                type="date"
                name="dob"
                id="dob"
                className={`w-full outline-gray-400 outline-2 rounded-md px-2 py-1 mt-1 focus:outline-3 focus:outline-green-500`}
                value={child.dob}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="gender">Gender</label> <br />
              <div>
                <label className="mr-4">
                  <input
                    type="radio"
                    name="gender"
                    className={`outline-gray-400 rounded-md px-2 py-1 mt-1 mb-3`}
                    value="MALE"
                    checked={child.gender === "MALE"}
                    onChange={handleChange}
                    required
                  />
                  Male
                </label>
                <label className="mr-4">
                  <input
                    type="radio"
                    name="gender"
                    className={`outline-gray-400 rounded-md px-2 py-1 mt-1 mb-3`}
                    value="FEMALE"
                    checked={child.gender === "FEMALE"}
                    onChange={handleChange}
                    required
                  />
                  Female
                </label>
                <label className="mr-4">
                  <input
                    type="radio"
                    name="gender"
                    className={`outline-gray-400 rounded-md px-2 py-1 mt-1 mb-3`}
                    value="OTHER"
                    checked={child.gender === "OTHER"}
                    onChange={handleChange}
                    required
                  />
                  Other
                </label>
                <div>
                  <label htmlFor="status">Status</label>
                  <div>
                    <label className="mr-4">
                      <input
                        type="radio"
                        name="status"
                        className={`outline-gray-400 rounded-md px-2 py-1 mt-1 mb-3`}
                        value="ACTIVE"
                        checked={child.status === "ACTIVE"}
                        onChange={handleChange}
                        required
                      />
                      Active
                    </label>
                    <label className="mr-4">
                      <input
                        type="radio"
                        name="status"
                        className={`outline-gray-400 rounded-md px-2 py-1 mt-1 mb-3`}
                        value="ADOPTED"
                        checked={child.status === "ADOPTED"}
                        onChange={handleChange}
                        required
                      />
                      Adopted
                    </label>
                    <label className="mr-4">
                      <input
                        type="radio"
                        name="status"
                        className={`outline-gray-400 rounded-md px-2 py-1 mt-1 mb-3`}
                        value="TRANSFERRED"
                        checked={child.status === "TRANSFERRED"}
                        onChange={handleChange}
                        required
                      />
                      Transferred
                    </label>
                    <label className="mr-4">
                      <input
                        type="radio"
                        name="status"
                        className={`outline-gray-400 rounded-md px-2 py-1 mt-1 mb-3`}
                        value="DECEASED"
                        checked={child.status === "DECEASED"}
                        onChange={handleChange}
                        required
                      />
                      Deceased
                    </label>
                  </div>
                  <div>
                    <button
                      className={`bg-green-500 py-1 px-3 shadow-sm text-white rounded-md`}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
      <div className={`flex-col`}>
        <div>
          <h3 className={`font-bold text-xl`}>Children Details</h3>
        </div>
        <div className={`grid grid-cols-5 gap-4 text-center`}>
          <div className={`bg-sky-100 rounded-md`}>
            <h4 className={`bg-sky-100 font-bold`}>Name</h4>
          </div>
          <div className={`bg-sky-100 rounded-md`}>
            <h4 className={`bg-sky-100 font-bold`}>Date of Birth</h4>
          </div>
          <div className={`bg-sky-100 rounded-md`}>
            <h4 className={`bg-sky-100 font-bold`}>Gender</h4>
          </div>
          <div className={`bg-sky-100 rounded-md`}>
            <h4 className={`bg-sky-100 font-bold`}>Status</h4>
          </div>
          <div></div>
          {loading ? (
            <>
            <div></div>
            <div></div>
            <div className="flex justify-center w-full">
              <img
                src="/images/spinner.svg"
                alt="spinner"
                className="animate-spin w-10"
              />
            </div>
            <div></div>
            <div></div>
            </>
          ) : (
            children.map((child) => (
              <React.Fragment key={child.id}>
                <div>{child.name}</div>
                <div>{child.dob}</div>
                <div>{child.gender}</div>
                <div>{child.status}</div>
                <div className={`flex w-full justify-evenly`}>
                  <button>
                    <Edit />
                  </button>
                  <button id={`${child.id}`}>
                    <Trash2 />
                  </button>
                </div>
              </React.Fragment>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Children;
