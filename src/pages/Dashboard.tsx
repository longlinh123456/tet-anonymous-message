import Navbar from "../components/Navbar"
import {useNavigate} from "react-router-dom"
import {useUser, useSigninCheck} from "reactfire"
import DashboardLink from "../components/DashboardLink"
import Inbox from "../components/Inbox"
import {useState} from "react"
import FocusedMessage from "../components/FocusedMessage"
import Loading from "../components/Loading"

function Dashboard() {
	const navigate = useNavigate()
	const {status, data: user} = useSigninCheck()
	const userData = useUser().data
	const [displayedMessage, setDisplayedMessage] = useState("")

	if (status === "loading") {
		return <Loading />
	} else {
		if (!user.signedIn) {
			navigate("/login")
		}
		
		const inboxLink = `${window.location.origin}/tet-anonymous-message/sendmessage/${userData?.uid}`
		return (
			<>
				<div className="flex h-screen w-screen flex-col">
					<Navbar title="Lời chúc tết"/>
					<div className="flex grow flex-col items-center justify-center bg-cover">
						<DashboardLink inboxLink={inboxLink} />
						<Inbox setMessage={setDisplayedMessage}/>
						{(displayedMessage !== "") && <FocusedMessage message={displayedMessage} setMessage={setDisplayedMessage}/>}
					</div>
				</div>
			</>
		)
	}
}

export default Dashboard