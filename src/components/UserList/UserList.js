import React, {useState, forwardRef} from 'react';
import {useQuery} from '@tanstack/react-query';
import {useNavigate} from 'react-router';
import MaterialTable from '@material-table/core';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import {toast} from 'react-hot-toast';
import Spinner from '../Spinner/Spinner';
const UserList = () => {
	//* Material Table Icons
	const tableIcons = {
		Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
		Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
		Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
		Delete: forwardRef((props, ref) => <Delete {...props} ref={ref} />),
		DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
		Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
		Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
		Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
		FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
		LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
		NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
		PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
		ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
		Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
		SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
		ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
		ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
	};
	const navigate = useNavigate();
	//*Get Token
	const token = window.localStorage.getItem('Token');
	//*set User
	const [user, setUser] = useState();
	//* Selected Delete Items
	const [selectedRows, setSelectedRows] = useState([]);
	//*set customer to api
	const [customers, setCustomers] = useState([]);
	//*add  Customer Data
	fetch('https://contact-list-server.vercel.app/contactlist', {
		method: 'POST',
		headers: {
			'content-Type': 'application/json',
		},
		body: JSON.stringify({token}),
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.status === 200) {
				!user && setUser(data.data);
			}
			//* JWT Expires
			if (data.data === 'forbidden access') {
				navigate('/signin');
			}
			if (data.error) {
				alert(data.error);
			}
		});

	//*load all customer data
	const {isLoading, refetch} = useQuery({
		queryKey: [user],
		queryFn: async () => {
			const res = await fetch(
				`https://contact-list-server.vercel.app/customerlist?email=${user?.email}`,
			);
			const data = await res.json();
			setCustomers(data);
			return data;
		},
	});

	if (isLoading) {
		return <Spinner></Spinner>;
	}
	//*delete data
	const handleDelete = () => {
		//*get id From Selected data
		const updatedData = selectedRows.map((row) => row._id);
		//*show rest customer
		const restCustomer = customers.filter((item) => !updatedData.includes(item._id));
		setCustomers(restCustomer);
		//*Backend call
		fetch(`https://contact-list-server.vercel.app/customerlist/`, {
			method: 'DELETE',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(updatedData),
		})
			.then((resp) => resp.json())
			.then((resp) => {
				if (resp.status === 200) {
					toast.success('Delete Successfull', {
						style: {
							border: '1px solid #D94A38',
							padding: '16px',
							color: '#D94A38',
							fontWeight: 'bold',
						},
					});
				}
			});
	};
	const columns = [
		{
			title: 'Name',
			field: 'name',
		},
		{
			title: 'Email',
			field: 'email',
		},
		{
			title: 'Phone',
			field: 'Phone',
		},
	];
	return (
		<div>
			<MaterialTable
				icons={tableIcons}
				title={'Customer Details'}
				columns={columns}
				onSelectionChange={(rows) => setSelectedRows(rows)}
				data={customers}
				options={{actionsColumnIndex: -1, addRowPosition: 'first', selection: true}}
				//*delete action
				actions={[
					{
						icon: Delete,
						tooltip: 'Delete Selected Items',
						onClick: () => handleDelete(),
					},
				]}
				//*add new customer data
				editable={{
					onRowAdd: (newData) =>
						new Promise((resolve, reject) => {
							const data = {
								...newData,
								user_email: user.email,
							};

							//*Backend call
							fetch('https://contact-list-server.vercel.app/customerlist', {
								method: 'POST',
								headers: {
									'Content-type': 'application/json',
								},
								body: JSON.stringify(data),
							})
								.then((resp) => resp.json())
								.then((resp) => {
									if (resp.acknowledged) {
										toast.success('Add Data  Successfull', {
											style: {
												border: '1px solid #D94A38',
												padding: '16px',
												color: '#D94A38',
												fontWeight: 'bold',
											},
										});
										refetch();
										resolve();
									}
								});
						}),
					//*Update Customer Data
					onRowUpdate: (newData, oldData) =>
						new Promise((resolve, reject) => {
							console.log(oldData._id);
							//*Backend call
							fetch(`https://contact-list-server.vercel.app/customerlist/${oldData._id}`, {
								method: 'PUT',
								headers: {
									'Content-type': 'application/json',
								},
								body: JSON.stringify(newData),
							})
								.then((resp) => resp.json())
								.then((resp) => {
									toast.success('Update Data Successfull', {
										style: {
											border: '1px solid #D94A38',
											padding: '16px',
											color: '#D94A38',
											fontWeight: 'bold',
										},
									});
									refetch();
									resolve();
								});
						}),
				}}
			></MaterialTable>
		</div>
	);
};

export default UserList;
