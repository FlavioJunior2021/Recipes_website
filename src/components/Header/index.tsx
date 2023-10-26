"use client";

import Image from "next/image";
import logo from "../../../public/logo.svg";
import Link from "next/link";
import { GetUser } from "@/lib/auth";
import { useState, useEffect } from 'react';

export function Header() {
	const [user, setUser] = useState(GetUser());

	useEffect(() => {
		setUser(GetUser());
	}, [user]);

	const { username, admin } = user;
	
	function getOut(){
		localStorage.removeItem('token')
	}

	return (
		<div className="navbar bg-base-100 text-body">
			<div className="navbar-start">
				<div className="dropdown">
					<label tabIndex={0} className="btn btn-ghost lg:hidden">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h8m-8 6h16"
							/>
						</svg>
					</label>
					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
					>
						<li>
							<a href="/">Home</a>
						</li>
						<li>
							<a>Recipes</a>
						</li>
						<li>
							<a>Account</a>
						</li>
						{admin && (
							<>
								<li>
									<a href="/admin/users">Users List</a>
								</li>
								<li>
									<a href="/admin/recipes">Recipes List</a>
								</li>
							</>
						)}
					</ul>
				</div>
				<a className="btn btn-ghost normal-case text-xl">
					<Image src={logo} width={110} height={30} alt="logo-img" />
				</a>
			</div>
			<div className="navbar-center hidden lg:flex">
				<ul className="menu menu-horizontal px-1">
					<li>
						<a href="/">Home</a>
					</li>
					<li>
						<a href="/recipes">Recipes</a>
					</li>
					<li>
						<a>Account</a>
					</li>
					{admin && (
						<>
							<li>
								<a href="/admin/users">Users List</a>
							</li>
							<li>
								<a href="/admin/recipes">Recipes List</a>
							</li>
						</>
					)}
				</ul>
			</div>
			<span className="navbar-end text-span hover:text-blue-400 pr-4">
				{username === "Guest" ? <a href="/auth/login">login to continue</a> : <button onClick={getOut}>Sair</button>}
			</span>
		</div>
	);
}
