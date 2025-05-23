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
		<div className="container mx-auto p-4">
			<div className="text-2xl font-bold mb-4">Hello from UseEffectDemoPractice</div>
			<button 
				className="btn btn-primary" 
				data-testid="refresh-button" 
				onClick={() => setRefresh(true)}
			>
				Refresh
			</button>
			<div className="mt-4" data-testid="users-container">
				{
					(() => {
						if (isLoading) return (
							<div className="flex justify-center">
								<span className="loading loading-spinner loading-lg"></span>
								<span className="ml-2">Loading data</span>
							</div>
						);
						if (errorMessage) return (
							<div className="alert alert-error">
								<svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								<div>
									<h3 className="font-bold">Failed to fetch user data</h3>
									<div className="text-xs">{errorMessage.message}</div>
								</div>
							</div>
						);
						if (users) return (
							<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
								{users.map(user => (
									<div key={user.email} className="card bg-base-100 shadow-xl">
										<div className="card-body">
											<h2 className="card-title">{user.name}</h2>
											<div className="space-y-2">
												<p className="flex items-center gap-2">
													<span className="font-semibold">Email:</span>
													<span className="text-sm opacity-80">{user.email}</span>
												</p>
												<p className="flex items-center gap-2">
													<span className="font-semibold">Company:</span>
													<span className="text-sm opacity-80">{user.company.name}</span>
												</p>
											</div>
										</div>
									</div>
								))}
							</div>
						);
						return null;
					})()
				}
			</div>
		</div>
	)
}