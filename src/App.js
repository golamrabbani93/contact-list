import SignIn from './components/SignIn/SignIn';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import SignUp from './components/SignUp/SignUp';
import UserList from './components/UserList/UserList';

const router = createBrowserRouter([
	{
		path: '/',
		element: <UserList></UserList>,
	},
	{
		path: '/signin',
		element: <SignIn></SignIn>,
	},
	{
		path: '/signup',
		element: <SignUp></SignUp>,
	},
]);
function App() {
	return (
		<div className="App">
			<RouterProvider router={router}></RouterProvider>
		</div>
	);
}

export default App;
