import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminNav = () => {
  const navigate = useNavigate();

  const navigateToPage = (route) => {
    navigate("/admin" + route);
  }

  return (
    <div
      className={`w-[20%] rounded-md text-black p-2 text-center h-full gap-3 bg-white flex flex-col`}
    >
      <div>
        <h2 className={`text-2xl font-bold pb-2`}>Adopt-a-Need</h2>
        <hr className={`border-gray-400`} />
      </div>
      <div>
        <button onClick={() => navigateToPage("/")} className="bg-gray-100 w-full py-1 rounded-md flex gap-3 items-center justify-center">
          Dashboard <ChevronRight />
        </button>
      </div>
      <div>
        <button onClick={() => navigateToPage("/children")} className="bg-gray-100 w-full py-1 rounded-md flex gap-3 items-center justify-center">
          Children <ChevronRight />
        </button>
      </div>
      <div>
        <button onClick={() => navigateToPage("/adoptionrequests")} className="bg-gray-100 w-full py-1 rounded-md flex gap-3 items-center justify-center">
          Adoption Requests <ChevronRight />
        </button>
      </div>
      <div>
        <button onClick={() => navigateToPage("/volunteer")} className="bg-gray-100 w-full py-1 rounded-md flex gap-3 items-center justify-center">
          Volunteers <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default AdminNav;
