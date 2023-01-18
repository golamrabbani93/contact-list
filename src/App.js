import SignIn from './components/SignIn/SignIn';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import SignUp from './components/SignUp/SignUp';
import UserList from './components/UserList/UserList';
import {Toaster} from 'react-hot-toast';

//* Router Start
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
//* Router End
function App() {
	return (
		<div className="App">
			<RouterProvider router={router}></RouterProvider>
			<Toaster />
		</div>
	);
}

export default App;
