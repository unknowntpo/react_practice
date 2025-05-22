import { useEffect, useState } from "react";

interface Company {
	name: string;
}

interface User {
	id: number;
	name: string;
	email: string;
	company: Company;
}

export default function UseEffectDemoPractice() {
	const [refreshTriggered, setRefresh] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const [errorMessage, setError] = useState<Error | null>(null);
	const [users, setUsers] = useState<User[] | null>(null)
	
	useEffect(() => {
		// prevent initial call of userEffect
		if (!refreshTriggered) return;
		const fetchUser = async() => {
			await fetch('https://jsonplaceholder.typicode.com/users')
				.then(resp => {
					if (!resp.ok) {
						throw new Error(`Status: ${resp.status}`);
					}
					return resp.json();
				})
				.then(data => {console.log(`got data: ${JSON.stringify(data)}`); setUsers(data)})
				.catch((e)=> { console.log(e); setError(e) })
				.finally(() => {setRefresh(false); setLoading(false)});
		}

		setUsers(null);
		setError(null);
		setLoading(true);
		fetchUser();
	}, [refreshTriggered])
	return (
		<div>
			<div>Hello from UseEffectDemoPractice</div>
			<button className="refresh-button mr-2 p-2 bg-blue-700 hover:bg-blue-800" data-testid="refresh-button" onClick={() => setRefresh(true)}>Refresh</button>
			<div className="users-container" data-testid="users-container">
				{
					(() => {
						if (isLoading) return (<div>Loading data ...</div>);
						if (errorMessage) return (
							<div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md shadow-sm">
								<div className="flex items-center">
									<div className="flex-shrink-0">
										<svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
											<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
										</svg>
									</div>
									<div className="ml-3">
										<p className="text-sm text-red-700 font-medium">Failed to fetch user data</p>
										<p className="text-sm text-red-600 mt-1">{errorMessage.message}</p>
									</div>
								</div>
							</div>
						);
						if (users) return (
							<ul className="space-y-4">
								{
									users.map(user => (
										<li key={user.email} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
											<div>
												<p className="text-gray-600 mb-2"><span className="font-semibold">Name:</span> {user.name}</p>
												<p className="text-gray-600 mb-2"><span className="font-semibold">Email:</span> {user.email}</p>
												<p className="text-gray-600"><span className="font-semibold">Company:</span> {user.company.name}</p>
											</div>
										</li>
								))
								}
							</ul>
						);
						return null;
					})()
				}
				<div>
				</div>
			</div>
		</div>
	)
}