"use client";

import { Button } from "@/components/Button";
import { api } from "@/lib/api";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { GetUser } from "@/lib/auth";

export default function Login() {
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const { sub } = GetUser();

	if (sub) {
		router.push("/");
	}

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		setLoading(true);
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		let email = formData.get("email") as string

		try {
			const response = await api.post("/auth", {
				email: email.toLowerCase(),
				password: formData.get("password"),
			});
			const { token } = response.data;
			localStorage.setItem("token", token as string);
			router.push("/");
		} catch (err) {
			window.alert("Credenciais invalidas");
		}
		setLoading(false);
	}

	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Sign in to your account
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
						<Button isLoading={loading} type="submit">
							Login
						</Button>
					</div>
				</form>

				<p className="mt-10 text-center text-sm text-gray-500">
					Not a member?{" "}
					<a
						href="/logon"
						className="font-semibold leading-6 text-blue-400 hover:text-blue-500"
					>
						Make your account
					</a>
				</p>
			</div>
		</div>
	);
}
