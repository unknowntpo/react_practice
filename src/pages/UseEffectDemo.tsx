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
	const [userData, setUserData] = useState<UserData | null>(null); // fetched user data
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		// Effect runs every time `userId` changes
		fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
			.then(res => res.json())
			.then((data: UserData) => {
				setUserData(data);
				setLoading(false);
			});
	}, [userId]); // 🔁 Only re-run if userId changes

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