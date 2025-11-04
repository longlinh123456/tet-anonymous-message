import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import {AuthProvider, FirestoreProvider, useFirebaseApp} from "reactfire"
import SendMessage from "./pages/SendMessage"
import Dashboard from "./pages/Dashboard"
import LandingPage from "./pages/Landing"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
const router = createBrowserRouter([
	{
		path: "login",
		element: <Login />
	},
	{
		path: "dashboard",
		element: <Dashboard />
	},
	{
		path: "signup",
		element: <SignUp />
	},
	{
		path: "sendmessage/:uid",
		element: <SendMessage />
	},
	{
		path: "*",
		element: <LandingPage />
	},
], {basename: "/tet-anonymous-message"})


function App() {
	const app = useFirebaseApp()
	const db = getFirestore(app)

	const auth = getAuth(app)
	return (
		<FirestoreProvider sdk={db}>
			<AuthProvider sdk={auth}>
				<RouterProvider router={router} />
			</AuthProvider>
		</FirestoreProvider>
	)
}

export default App