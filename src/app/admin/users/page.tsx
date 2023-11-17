"use client"

import { api } from "@/lib/api";
import { GetUser } from "@/lib/auth";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Users() {
	const router = useRouter()
	const { sub } = GetUser();

	if (!sub) {
		router.push("/");
	}

	const [users, setUsers] = useState<User[]>([])

	useEffect(() => {
		async function getUsers() {
			try {
				const token = localStorage.getItem("token") as string
				const res = await api.get("/admin/users", {
					headers: {
						Authorization: `Bearer ${token}`
					}
				})
				setUsers(res.data)
			} catch (err) {
				window.alert(err)
			}
		}

		getUsers()
	}, [])

	async function handleDeleteUser(userId: string) {
		try {
			const token = localStorage.getItem("token") as string
			await api.delete(`/admin/${userId}/user`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			setUsers(users.filter(user => user.id !== userId))
		} catch (err) {
			window.alert(err)
		}
	}

	return (
		<div className="overflow-x-auto">
			<table className="table table-zebra">
				{/* head */}
				<thead>
					<tr>
						<th>Name</th>
						<th>Email</th>
						<th>Admin</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user, index) => (
						<tr key={index}>
							<td>{user.username}</td>
							<td>{user.email}</td>
							<td>{user.isAdmin ? 'Yes' : 'No'}</td>
							<td><button type="button" onClick={() => handleDeleteUser(user.id)} className="btn-md bg-transparent text-red-600 hover:text-red-700">Delete</button></td>
						</tr>
					))}
				</tbody>

			</table>
		</div>
	)
}