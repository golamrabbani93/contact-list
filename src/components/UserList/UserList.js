import React from 'react';
import {useNavigate} from 'react-router';

const UserList = () => {
	const navigate = useNavigate();
	const token = window.localStorage.getItem('Token');
	fetch('http://localhost:5000/contactlist', {
		method: 'POST',
		headers: {
			'content-Type': 'application/json',
		},
		body: JSON.stringify({token}),
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.data === 'forbidden access') {
				navigate('/signin');
			}
			if (data.error) {
				alert(data.error);
			}
		});
	return (
		<div>
			<h2>UserList</h2>
		</div>
	);
};

export default UserList;
