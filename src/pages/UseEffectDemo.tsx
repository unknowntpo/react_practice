import { useEffect, useState } from "react";

interface Company {
	name: string;
}

interface UserData {
	name: string;
	email: string;
	company: Company;
}

export default function UserEffectDemo() {
	const [userId, setUserId] = useState(1);
	const [userData, setUserData] = useState<UserData | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchUser = async () => {
			setLoading(true);
			setError(null);
			try {
				const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
				if (!res.ok) {
					throw new Error(`HTTP error! status: ${res.status}`);
				}
				const data: UserData = await res.json();
				setUserData(data);
			} catch (error) {
				setError(error instanceof Error ? error.message : 'Failed to fetch user data');
				setUserData(null);
			} finally {
				setLoading(false);
			}
		};

		fetchUser();
	}, [userId]);

	return (
		<div>
			<button
				className="px-5 py-2 mr-2 mb-2 bg-blue-700 text-white cursor-pointer text-base font-medium hover:bg-blue-800 transition-colors"
				onClick={() => setUserId(1)}
			>
				Set User1
			</button>
			<button
				className="px-5 py-2 mr-2 mb-2 bg-green-700 text-white rounded cursor-pointer text-base font-medium hover:bg-green-800 transition-colors"
				onClick={() => setUserId(2)}
			>
				Set User2
			</button>
			<button
				className="px-5 py-2 mr-2 mb-2 bg-orange-600 text-white rounded cursor-pointer text-base font-medium hover:bg-orange-700 transition-colors"
				onClick={() => setUserId(3)}
			>
				Set User3
			</button>

			{loading ? (
				<p>Loading user data...</p>
			) : error ? (
				<div className="text-red-600 p-4 bg-red-100 rounded">
					<p>Error: {error}</p>
				</div>
			) : (
				userData && (
					<div>
						<h2>{userData.name}</h2>
						<p>Email: {userData.email}</p>
						<p>Company: {userData.company.name}</p>
					</div>
				)
			)}
		</div>
	);
}