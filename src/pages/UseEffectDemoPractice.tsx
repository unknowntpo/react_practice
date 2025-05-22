import { useEffect, useState } from "react";

interface Company {
	name: string;
}

interface UserData {
	name: string;
	email: string;
	company: Company;
}

export default function UseEffectDemoPractice() {
	const [refreshTriggered, setRefresh] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const [userData, setUserData] = useState<UserData | null>(null)
	
	useEffect(() => {
		const fetchUser = async() => {
			const data: UserData = await fetch('https://jsonplaceholder.typicode.com/users/1')
				 .then(resp => resp.json())
				.catch((e)=> console.log(e))
				.finally(() => {setRefresh(false); setLoading(false)});
				setUserData(data);
		}

		setLoading(true);
		fetchUser();
	}, [refreshTriggered])
	return (
		<div>
			<div>Hello from UseEffectDemoPractice</div>
			<button className="refresh-button mr-2 p-2 bg-blue-700 hover:bg-blue-800" data-testid="refresh-button" onClick={() => setRefresh(true)}>Refresh</button>
			<div className="users-container" data-testid="users-container">
				{isLoading ? (<div>Loading data ...</div>) : userData && (
					<div>
						<h1>User Data</h1>
							<p>Name: {userData.name}</p>
							<p>Email: {userData.email}</p>
							<p>Company: {userData.company.name}</p>
					</div>
				)}
				<div>
				</div>
			</div>
		</div>
	)
}