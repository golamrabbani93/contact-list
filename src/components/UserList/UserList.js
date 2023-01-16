import React, {useContext} from 'react';
import {AuthContext} from '../../context/AuthProvider';

const UserList = () => {
	const user = useContext(AuthContext);
	console.log('🚀🚀: UserList -> user', user);
	return (
		<div>
			<h2>UserList</h2>
		</div>
	);
};

export default UserList;
