import { useAuth } from "../context/AuthContext";
import { useChildren } from "../context/ChildrenContext";
import {useVolunteer} from "../context/VolunteerContext";

const AdminDashboard = () => {
    const {userData} = useAuth();

    const {childrenInfo} = useChildren();

    const {volunteers} = useVolunteer();

    return (
        <section className={`p-3 flex flex-col gap-5 overflow-y-scroll`}>
            <div>
                <h1 className={`font-bold text-3xl`}>Hello {userData.username}</h1>
            </div>
            <div className={`flex gap-4`}>
                <div className={`bg-sky-100 shadow-2xs rounded-md size-1/3 p-3 flex-col justify-center items-center text-center`}>
                    <h3 className={`font-bold text-xl`}>Children</h3>
                    <p>{childrenInfo?.length}</p>
                </div>
                <div className={`bg-sky-100 shadow-2xs rounded-md size-1/3 p-3 flex-col justify-center items-center text-center`}>
                    <h3 className={`font-bold text-xl`}>Donations</h3>
                    <p>₹ 12000</p>
                </div>
                <div className={`bg-sky-100 shadow-2xs rounded-md size-1/3 p-3 flex-col justify-center items-center text-center`}>
                    <h3 className={`font-bold text-xl`}>Volunteers</h3>
                    <p>{volunteers?.length}</p>
                </div>
            </div>
            <hr className={`border-gray-400`} />
            <h3 className={`font-bold text-xl`}>Recent Donations</h3>
            <div className={`grid grid-cols-3 gap-4 w-full text-center`}>
                <div className={`bg-sky-100 rounded-md`}>
                    <h4 className={`font-bold`}>Name</h4>
                </div>
                <div className={`bg-sky-100 rounded-md`}>
                    <h4 className={`font-bold`}>Amount</h4>
                </div>
                <div className={`bg-sky-100 rounded-md`}>
                    <h4 className={`font-bold`}>Date</h4>
                </div>
                <div>
                    <p>Aryan Chauhan</p>
                </div>
                <div>
                    <p>₹ 100</p>
                </div>
                <div>
                    <p>2025-12-25</p>
                </div>
            </div>
        </section>
    );
};

export default AdminDashboard;