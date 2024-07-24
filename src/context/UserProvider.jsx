import React from "react";
import { useQuery } from "react-query";
import { getUsers } from "../server/api";
import { useToken } from "./TookenProvider";

const UserDataContext = React.createContext();


export const UserProvider = ({ children }) => {
    const [user, setUser] = React.useState(null);

    const {onLogout} = useToken();
 
    const user_data = useQuery('user', getUsers,{
        onError:(data)=>{
            if(data.message == "Request failed with status code 401"){
                onLogout();
            }
        }
    });

    React.useEffect(() => {
        user_data?.refetch();
    }, []);

    const users = React.useMemo(() => {
        return user_data?.data?.data;
    }, [user_data]);

    return (
        <UserDataContext.Provider value={{ user, setUser, users }}>
            {children}
        </UserDataContext.Provider>
    );
}

export const useUser = () => {
    const context = React.useContext(UserDataContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}