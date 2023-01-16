import React, {createContext, useState} from 'react';
export const AuthContext = createContext();
const AuthProvider = ({children}) => {
	const [user, setUser] = useState('hello');
	const info = {user};
	return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
