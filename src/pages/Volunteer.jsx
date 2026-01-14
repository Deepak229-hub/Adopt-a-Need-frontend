import { useState } from "react";
import { addVolunteer, deleteVolunteer, updateVolunteer } from "../api/volunteer";
import { useAuth } from "../context/AuthContext";
import { useVolunteer } from "../context/VolunteerContext";
import { Edit, Trash2, X } from "lucide-react";

const Volunteer = () => {
    const [showAdd, setShowAdd] = useState(false);
    const [newVolunteer, setNewVolunteer] = useState({
        name: "",
        email: "",
        phone: "",
        avl_on: "SUNDAY",
        address: "",
    });

    const [addLoading, setAddLoading] = useState(false);

    const {token} = useAuth();

    const {volunteers, setVolunteers} = useVolunteer();

    const [editVolunteer, setEditVolunteer] = useState({
        id: null,
        name: "",
        email: "",
        phone: "",
        avl_on: "",
        address: "",
    });

    return (
        <section className={`flex flex-col h-full gap-5 p-3 overflow-y-scroll`}>
            <div>
                <button onClick={() => setShowAdd(prev => !prev)} className={`bg-green-500 text-white py-1 px-3 rounded-md shadow-sm`}>Add Volunteer</button>
            </div>

            {showAdd && (
                <div>
                    <form className={`flex flex-col gap-3 w-1/2`} onSubmit={async (e) => {
                        e.preventDefault();
                        setAddLoading(true);
                        const response = await addVolunteer(newVolunteer, token);
                        if (response.ok) {
                            setAddLoading(false);
                            setVolunteers(prev => [...prev, response.msg[0]]);
                            alert("New Volunteer Added!");
                            setNewVolunteer({
                                name: "",
                                email: "",
                                phone: "",
                                avl_on: "SUNDAY",
                                address: "",
                            });
                        } else {
                            alert(response.msg);
                            setAddLoading(false);
                        }
                    }}>
                        <div>
                            <label htmlFor="name">Name: </label> <br />
                            <input
                             type="text"
                             name="name"
                             placeholder="enter volunteer's name"
                             value={newVolunteer.name}
                             onChange={(e) => setNewVolunteer({...newVolunteer, [e.target.name]: e.target.value})}
                             className="outline-2 px-3 rounded-sm focus:outline-3 focus:outline-green-500 w-full"
                             required
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Email: </label> <br />
                            <input
                             type="email"
                             name="email"
                             value={newVolunteer.email}
                             placeholder="enter volunteers email"
                             onChange={(e) => setNewVolunteer({...newVolunteer, [e.target.name]: e.target.value})}
                             className="outline-2 px-3 rounded-sm focus:outline-3 focus:outline-green-500 w-full"
                             required
                            />
                        </div>
                        <div>
                            <label htmlFor="phone">Phone: </label>
                            <input
                             type="number"
                             name="phone"
                             value={newVolunteer.phone}
                             placeholder="enter volunteers phone"
                             onChange={(e) => setNewVolunteer({...newVolunteer, [e.target.name]: e.target.value})}
                             className="outline-2 px-3 rounded-sm focus:outline-3 focus:outline-green-500"
                             required
                            />
                        </div>
                        <div>
                            <label htmlFor="avl_on">Available on: </label>
                            <select 
                             name="avl_on"
                             value={newVolunteer.avl_on}
                             onChange={(e) => setNewVolunteer({...newVolunteer, [e.target.name]: e.target.value})}
                             className="outline-2 px-3 rounded-sm" 
                            >
                                <option value="SUNDAY">Sunday</option>
                                <option value="MONDAY">Monday</option>
                                <option value="TUESDAY">Tuesday</option>
                                <option value="WEDNESDAY">Wednesday</option>
                                <option value="THURSDAY">Thursday</option>
                                <option value="FRIDAY">Friday</option>
                                <option value="SATURDAY">Saturday</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="address">Address: </label> <br />
                            <textarea 
                             name="address"
                             value={newVolunteer.value}
                             onChange={(e) => setNewVolunteer({...newVolunteer, [e.target.name]: e.target.value})}
                             className="w-full outline-2 rounded-sm p-3 resize-none"
                            ></textarea>
                        </div>
                        <div>
                            <button type="submit" className={`text-white px-3 rounded-sm shadow-sm ${addLoading ? 'bg-green-600 disabled' : 'bg-green-500'}`}>{addLoading ? 'Saving...' : 'Save'}</button>
                        </div>
                    </form>
                </div>
            )}

            <div className={`flex flex-col gap-3`}>
                <div>
                    <h3 className={`text-xl font-bold`}>Volunteers Detail</h3>
                </div>
                <div className={`flex flex-col gap-2`}>
                    <div className={`flex gap-4 w-full`}>
                        <div className={`w-1/5 text-center font-bold bg-sky-100`}>Name</div>
                        <div className={`w-1/5 text-center font-bold bg-sky-100`}>Email</div>
                        <div className={`w-1/5 text-center font-bold bg-sky-100`}>Phone</div>
                        <div className={`w-1/5 text-center font-bold bg-sky-100`}>Address</div>
                        <div className={`w-1/5 text-center font-bold bg-sky-100`}>Available on</div>
                        <div className={`w-1/5 text-center font-bold bg-sky-100`}></div>
                    </div>
                    {!volunteers ? (
                        <div className="flex justify-center">
                            <img src="/images/spinner.svg" alt="spinner" className="animate-spin w-10" />
                        </div>
                    ) : (
                        <>
                        {volunteers.map(volunteer => (
                            <div className={`grid grid-cols-6 gap-x-4 gap-y-1 w-full text-center`} key={volunteer.id}>
                                <div className={`overflow-x-scroll hide-scroll`}>{volunteer.name}</div>
                                <div className={`overflow-x-scroll hide-scroll`}>{volunteer.email}</div>
                                <div className={`overflow-x-scroll hide-scroll`}>{volunteer.phone}</div>
                                <div className={`overflow-x-scroll hide-scroll`}>{volunteer.address}</div>
                                <div className={`ocerflow-x-scroll hide-scroll`}>{volunteer.avl_on}</div>
                                <div className={`flex justify-evenly`}>
                                    <button onClick={() => setEditVolunteer(volunteer)}>
                                        <Edit />
                                    </button>
                                    <button onClick={async () => {
                                        const response = await deleteVolunteer({id: volunteer.id}, token);
                                        if (response.ok) {
                                            setVolunteers(prev => prev.filter(v => v.id !== volunteer.id));
                                            setEditVolunteer({
                                                id: null,
                                                name: "",
                                                email: "",
                                                phone: "",
                                                address: "",
                                                avl_on: "",
                                            });
                                            alert("Volunteer info deleted!");
                                        } else {
                                            alert("An error occured!");
                                        }
                                    }}>
                                        <Trash2 />
                                    </button>
                                </div>
                                {editVolunteer.id === volunteer.id && (
                                    <>
                                    <div>
                                        <input 
                                         type="text" 
                                         name="name"
                                         value={editVolunteer.name}
                                         onChange={(e) => setEditVolunteer({
                                            ...editVolunteer,
                                            [e.target.name]: e.target.value,
                                         })}
                                         className={`w-full text-center outline-1`}
                                        />
                                    </div>
                                    <div>
                                        <input 
                                         type="email"
                                         name="email"
                                         value={editVolunteer.email}
                                         onChange={(e) => setEditVolunteer({
                                            ...editVolunteer,
                                            [e.target.name]: e.target.value,
                                         })}
                                         className={`w-full text-center outline-1 hide-scroll`} 
                                        />
                                    </div>
                                    <div>
                                        <input 
                                         type="number" 
                                         name="phone"
                                         value={editVolunteer.phone}
                                         onChange={(e) => setEditVolunteer({
                                            ...editVolunteer,
                                            [e.target.name]: e.target.value,
                                         })}
                                         className={`w-full text-center outline-1`} 
                                        />
                                    </div>
                                    <div>
                                        <input
                                         type="text"
                                         name="address"
                                         value={editVolunteer.address}
                                         onChange={(e) => setEditVolunteer({
                                            ...editVolunteer,
                                            [e.target.name]: e.target.value,
                                         })}
                                         className={`w-full outline-1`}
                                        />
                                    </div>
                                    <div>
                                        <select 
                                         name="avl_on"
                                         value={editVolunteer.avl_on}
                                         onChange={(e) => setEditVolunteer({
                                            ...editVolunteer,
                                            [e.target.name]: e.target.value,
                                         })}
                                         className={`w-full outline-1 text-center`} 
                                        >
                                            <option value="SUNDAY">Sunday</option>
                                            <option value="MONDAY">Monday</option>
                                            <option value="TUESDAY">Tuesday</option>
                                            <option value="WEDNESDAY">Wednesday</option>
                                            <option value="THURSDAY">Thursday</option>
                                            <option value="FRIDAY">Friday</option>
                                            <option value="SATURDAY">Saturday</option>
                                        </select>
                                    </div>
                                    <div className="flex justify-evenly">
                                         <button className={`bg-green-500 px-3 shadow-sm rounded-sm text-white`} onClick={async () => {
                                            const response = await updateVolunteer(editVolunteer, token);
                                            if (response.ok) {
                                                setVolunteers(prev => prev.map(v => v.id === editVolunteer.id ? response.msg : v));
                                                setEditVolunteer({
                                                    id: null,
                                                    name: "",
                                                    email: "",
                                                    phone: "",
                                                    avl_on: "",
                                                    address: "",
                                                });
                                                alert("Volunteer info updated!");
                                            } else {
                                                alert("An error occured!");
                                            }
                                         }}>
                                            Save
                                         </button>
                                         <button onClick={() => {
                                            setEditVolunteer({
                                                id: null,
                                                name: "",
                                                email: "",
                                                phone: "",
                                                avl_on: "",
                                                address: "",
                                            });
                                         }}>
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

export default Volunteer;