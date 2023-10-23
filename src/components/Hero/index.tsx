'use client'
/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import heroimage from "../../assets/heroimage.png";
import { GetUser } from "@/lib/auth";
import { useState, useEffect } from 'react';

export function Hero() {
	const [user, setUser] = useState(GetUser());

	useEffect(() => {
		setUser(GetUser());
	}, [user]);

	const { username } = user;
	

	return (
		<div className="min-h-screen w-full flex flex-row justify-center pt-5">
			<div className="bg-hero w-[680px] h-[640px] flex justify-center flex-col p-12 rounded-md">
				<h1 className="text-body text-6xl font-semibold mb-6">
					Enjoy the most Delicious dishes in The world
				</h1>
				<span className="text-base text-span leading-7">
					Create an account and join the community, post your dishes now!
				</span>
				{username === "Guest" ? (
					<a href="/login" className="mt-10 text-span hover:text-blue-400">
						Log in to post your recipes
					</a>
				) : (
					<p className="mt-2 text-span hover:text-blue-400">Bem vindo {username}</p>
				)}
			</div>
			<div>
				<Image src={heroimage} alt="hero" className="rounded-md" />
			</div>
		</div>
	);
}
