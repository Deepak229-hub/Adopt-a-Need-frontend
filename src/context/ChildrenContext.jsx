import { createContext, useContext, useEffect, useState } from "react";
import { getChildren } from "../api/children";
import { useAuth } from "./AuthContext";

const ChildrenContext = createContext();

export const ChildrenProvider = ({children}) => {
    const [childrenInfo, setChildren] = useState(null);
    const {token} = useAuth();

    useEffect(() => {
        const getInfo = async () => {
            const response = await getChildren(token);
            if(response.ok) setChildren(response.msg);;
        }

        getInfo();
    }, []);

    return (
        <ChildrenContext.Provider value={{childrenInfo, setChildren}}>
            {children}
        </ChildrenContext.Provider>
    );
};

export const useChildren = () => useContext(ChildrenContext);