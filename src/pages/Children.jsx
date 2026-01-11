import { useEffect, useState } from "react";
import { createChild, deleteChild, getChildren, updateChild } from "../api/children";
import { useAuth } from "../context/AuthContext";
import { Check, Edit, Trash2, X } from "lucide-react";
import { useChildren } from "../context/ChildrenContext";

const Children = () => {
  const [newChild, setNewChild] = useState({
    name: "",
    dob: "",
    gender: "MALE",
    status: "ACTIVE",
  });

  const { token } = useAuth();

  const {childrenInfo, setChildren} = useChildren();

  const [showAdd, setShowAdd] = useState(false);

  const [loading, setLoading] = useState(true);

  const [openEdit, setOpenEdit] = useState(false);

  const [editChild, setEditChild] = useState({
    id: null,
    name: "",
    dob: "",
    gender: "",
    status: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewChild({
      ...newChild,
      [name]: value,
    });
  };

  const handleClick = (child) => {
    console.log(child.id);
    console.log(child);
    setEditChild(child);
  };

  return (
    <section className={`flex flex-col h-full gap-5 p-3`}>
      <div>
        <button
          className={`bg-green-500 text-white py-1 px-3 rounded-md shadow-sm`}
          onClick={() => setShowAdd((prev) => !prev)}
        >
          Add Child
        </button>
      </div>
      {showAdd && (
        <div>
          <form
            className={`flex flex-col gap-3 w-1/2`}
            onSubmit={async (e) => {
              e.preventDefault();
              const response = await createChild(newChild, token);
              if (response.ok) {
                setChildren(prev => [...prev, response.msg]);
                setNewChild({
                  name: "",
                  dob: "",
                  gender: "MALE",
                  status: "ACTIVE",
                });
                alert("New child added!");
              } else {
                alert("An error occured!");
              }
            }}
          >
            <div>
              <label htmlFor="name">Name: </label>
              <input
                type="text"
                name="name"
                value={newChild.name}
                onChange={handleChange}
                placeholder="enter child's name"
                className={`w-full outline-2 px-3 rounded-sm focus:outline-3 focus:outline-green-500`}
                required
              />
            </div>
            <div>
              <label htmlFor="dob">Date of Birth: </label>
              <input
                type="date"
                name="dob"
                value={newChild.dob}
                onChange={handleChange}
                className={`outline-2 px-3 rounded-sm focus:outline-3 focus:outline-green-500`}
                required
              />
            </div>
            <div>
              <label htmlFor="gender">Gender: </label>
              <label className="mr-4">
                <input
                  type="radio"
                  name="gender"
                  value="MALE"
                  checked={newChild.gender === "MALE"}
                  onChange={handleChange}
                  className={`px-3 rounded-sm`}
                  required
                />
                Male
              </label>
              <label className="mr-4">
                <input
                  type="radio"
                  name="gender"
                  value="FEMALE"
                  checked={newChild.gender === "FEMALE"}
                  onChange={handleChange}
                  className={`px-3 rounded-sm`}
                  required
                />
                Female
              </label>
              <label className="mr-4">
                <input
                  type="radio"
                  name="gender"
                  value="OTHER"
                  checked={newChild.gender === "OTHER"}
                  onChange={handleChange}
                  className={`px-3 rounded-sm`}
                  required
                />
                Other
              </label>
            </div>
            <div>
              <label htmlFor="status">Status: </label>
              <label className="mr-4">
                <input
                  type="radio"
                  name="status"
                  value="ACTIVE"
                  checked={newChild.status === "ACTIVE"}
                  onChange={handleChange}
                  className={`px-3 rounded-sm`}
                  required
                />
                Active
              </label>
              <label className="mr-4">
                <input
                  type="radio"
                  name="status"
                  value="ADOPTED"
                  checked={newChild.status === "ADOPTED"}
                  onChange={handleChange}
                  className={`px-3 rounded-sm`}
                  required
                />
                Adopted
              </label>
              <label className="mr-4">
                <input
                  type="radio"
                  name="status"
                  value="TRANSFERRED"
                  checked={newChild.status === "TRANSFERRED"}
                  onChange={handleChange}
                  className={`px-3 rounded-sm`}
                  required
                />
                Transferred
              </label>
              <label className="mr-4">
                <input
                  type="radio"
                  name="status"
                  value="DECEASED"
                  checked={newChild.status === "DECEASED"}
                  onChange={handleChange}
                  className={`px-3 rounded-sm`}
                  required
                />
                Deceased
              </label>
            </div>
            <div>
              <button
                className={`text-white bg-green-500 px-3 rounded-sm shadow-sm`}
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      <div className={`flex flex-col gap-3`}>
        <div>
          <h3 className={`text-xl font-bold`}>Children Details</h3>
        </div>
        <div className="flex flex-col gap-2">
          <div className={`flex gap-4 w-full`}>
            <div className={`w-1/5 text-center font-bold bg-sky-100`}>Name</div>
            <div className={`w-1/5 text-center font-bold bg-sky-100`}>
              Date of Birth
            </div>
            <div className={`w-1/5 text-center font-bold bg-sky-100`}>
              Gender
            </div>
            <div className={`w-1/5 text-center font-bold bg-sky-100`}>
              Status
            </div>
            <div className={`w-1/5 text-center font-bold bg-sky-100`}></div>
          </div>

          {!childrenInfo ? (
            <div className="flex justify-center">
              <img
                src="/images/spinner.svg"
                alt="spinner"
                className="animate-spin w-10"
              />
            </div>
          ) : (
            <>
              {childrenInfo.map((child) => (
                <div
                  className={`grid grid-cols-5 gap-x-4 gap-y-1 w-full text-center`}
                  key={child.id}
                >
                  <div>{child.name}</div>
                  <div>{child.dob}</div>
                  <div>{child.gender}</div>
                  <div>{child.status}</div>
                  <div className={`flex justify-evenly`}>
                    <button onClick={() => handleClick(child)}>
                      <Edit />
                    </button>
                    <button onClick={async () => {
                        const response = await deleteChild({id: child.id}, token);
                        if (response.ok) {
                            setChildren(prev => prev.filter(c => c.id !== child.id));
                            setEditChild({
                                id: null,
                                name: "",
                                dob: "",
                                gender: "",
                                status: "",
                            });
                            alert("Child info deleted!");
                        } else {
                            alert("An error occured!");
                        }
                    }}>
                      <Trash2 />
                    </button>
                  </div>
                  {editChild.id === child.id && (
                    <>
                      <div>
                        <input
                          type="text"
                          name="name"
                          value={editChild.name}
                          onChange={(e) =>
                            setEditChild({
                              ...editChild,
                              [e.target.name]: e.target.value,
                            })
                          }
                          className="w-full text-center outline-1"
                        />
                      </div>
                      <div>
                        <input
                          type="date"
                          name="dob"
                          value={editChild.dob}
                          onChange={(e) => {
                            setEditChild({
                              ...editChild,
                              [e.target.name]: e.target.value,
                            });
                          }}
                          className="w-full text-center outline-1 px-3"
                        />
                      </div>
                      <div>
                        <select
                          name="gender"
                          value={editChild.gender}
                          onChange={(e) =>
                            setEditChild({
                              ...editChild,
                              [e.target.name]: e.target.value,
                            })
                          }
                          className="w-full text-center outline-1 px-3"
                        >
                          <option value="MALE">Male</option>
                          <option value="FEMALE">Female</option>
                          <option value="OTHER">Other</option>
                        </select>
                      </div>
                      <div>
                        <select
                          name="status"
                          value={editChild.status}
                          onChange={(e) =>
                            setEditChild({
                              ...editChild,
                              [e.target.name]: e.target.value,
                            })
                          }
                          className="w-full text-center outline-1 px-3"
                        >
                          <option value="ACTIVE">Active</option>
                          <option value="ADOPTED">Adopted</option>
                          <option value="TRANSFERRED">Transferred</option>
                          <option value="DECEASED">Deceased</option>
                        </select>
                      </div>
                      <div className={`flex justify-evenly`}>
                        <button
                          className={`bg-green-500 px-3 text-white rounded-sm shadow-sm`}
                          onClick={async () => {
                            console.log(editChild);
                            const response = await updateChild(editChild, token);
                            if(response.ok) {
                                setChildren(prev => prev.map(c => c.id === editChild.id ? response.msg : c));
                                setEditChild({
                                    id: null,
                                    name: "",
                                    dob: "",
                                    gender: "",
                                    status: "",
                                });
                                alert("Information Updated!");
                            } else {
                                alert("An error occured!");
                            }
                          }}
                        >
                          Save
                        </button>
                        <button
                          onClick={() =>
                            setEditChild({
                              id: null,
                              name: "",
                              dob: "",
                              gender: "",
                              status: "",
                            })
                          }
                        >
                          <X />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Children;
