import SignIn from './components/SignIn/SignIn';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import SignUp from './components/SignUp/SignUp';

const router = createBrowserRouter([
	{
		path: '/',
		element: <SignIn></SignIn>,
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
