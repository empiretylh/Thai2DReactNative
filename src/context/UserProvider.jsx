import React from "react";
import { useQuery } from "react-query";
import { getUsers } from "../server/api";

const UserDataContext = React.createContext();


export const UserProvider = ({ children }) => {
    const [user, setUser] = React.useState(null);

    const user_data = useQuery('user', getUsers);

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