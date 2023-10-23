"use client";

import { Button } from "@/components/Button";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { GetUser } from "@/lib/auth";


export default function Logon() {
	const { sub } = GetUser();
	const router = useRouter();

	if (sub) {
		router.push("/");
	}

	const [loading, setLoading] = useState(false);

	function validateEmail(email: string): boolean {
		const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		return regex.test(email);
	}

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		setLoading(true);
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		try {
			const password = formData.get("password");
			const confirmedPassword = formData.get("confirmedPassword");
			const email = formData.get("email") as string;

			if (!validateEmail(email)) {
				window.alert("E-mail inválido!");
				setLoading(false);
				return;
			}
			if (!password || password.length < 9) {
				window.alert("A senha deve ter mais de 9 caracteres!");
				setLoading(false);
				return;
			}
			if (confirmedPassword !== password) {
				window.alert("As senhas não coincidem!");
				setLoading(false);
				return;
			}

			const response = await api.post("/login", {
				email: email.toLowerCase(),
				password: password,
				username: formData.get("name"),
			});
			const token = response.data;
			localStorage.setItem("token", token as string);
			router.push("/");
		} catch (error) {
			window.alert(error);
		}
		setLoading(false);
	}

	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Make your account
				</h2>
			</div>
			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<form
					className="space-y-6"
					action="#"
					method="POST"
					onSubmit={handleSubmit}
				>
					<div>
						<label
							htmlFor="name"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Name
						</label>
						<div className="mt-2">
							<input
								id="name"
								name="name"
								type="text"
								required
								className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Email address
						</label>
						<div className="mt-2">
							<input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								required
								className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
					<div>
						<div className="flex items-center justify-between">
							<label
								htmlFor="password"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Password
							</label>
						</div>
						<div className="mt-2">
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								required
								className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
					<div>
						<div className="flex items-center justify-between">
							<label
								htmlFor="confirmedPassword"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Confirm password
							</label>
						</div>
						<div className="mt-2">
							<input
								id="confirmedPassword"
								name="confirmedPassword"
								type="password"
								autoComplete="current-password"
								required
								className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div>
						<Button isLoading={loading} type="submit">
							Logon
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
