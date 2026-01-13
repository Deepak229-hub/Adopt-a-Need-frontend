import { useState } from "react";
import { addVolunteer } from "../api/volunteer";
import { useAuth } from "../context/AuthContext";

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

    return (
        <section className={`flex flex-col h-full gap-5 p-3`}>
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

            
        </section>
    );
};

export default Volunteer;