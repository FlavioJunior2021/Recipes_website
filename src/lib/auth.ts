import decode from "jwt-decode";

type User = {
	username: string;
	email: string;
	sub: string;
	admin: boolean;
	id: string;
};
export function GetUser(): User {
	const token = localStorage.getItem("token") as string;

	if (!token) {
		console.log("Token not found")
	}

	let user: User;
	try {
		user = decode(token)
	} catch (e) {
		console.error(e);
		return {
			username: 'Guest',
			email: '',
			sub: '',
			admin: false,
			id: ''
		}
	}

	return user
}
