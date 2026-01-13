import { createContext, useContext, useEffect, useState } from "react";
import { getVoluneers } from "../api/volunteer";
import { useAuth } from "./AuthContext";

const VolunteerContext = createContext();

export const VolunteerProvider = ({ children }) => {
  const [volunteers, setVolunteers] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    async function getInfo() {
      const response = await getVoluneers(token);
      console.log(response);

      if (response.ok) {
        setVolunteers(response.msg);
      }
    }

    getInfo();
  }, []);

  return (
    <VolunteerContext.Provider value={{ volunteers, setVolunteers }}>
      {children}
    </VolunteerContext.Provider>
  );
};

export const useVolunteer = () => useContext(VolunteerContext);
