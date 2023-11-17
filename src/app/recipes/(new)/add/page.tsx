"use client";

import { Button } from "@/components/Button";
import { FilePicker } from "@/components/FilerPicker";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { api } from "@/lib/api";
import { GetUser } from "@/lib/auth";

const categories = [
	{ icon: "🌱", name: "Vegan", id: "4c164c6a-dad3-4249-a617-10d7292bc24a" },
	{ icon: "🥩", name: "Meat", id: "81232146-4211-436f-8fed-63b95854878c" },
	{ icon: "🍣", name: "Seafood", id: "8254821e-c67b-4277-bd08-bafbb5f55ae2" },
	{ icon: "🥗", name: "Salad", id: "89ec1a1c-801f-482e-b754-7a4d04f24ce5" },
	{ icon: "🍔", name: "Burgers", id: "955d6928-0955-4277-aa4e-85a4d56daf77" },
];

export default function New() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const token = localStorage.getItem("token") as string;
	const { id } = GetUser();

	if (!token) {
		router.push("/");
	}

	async function handleSubmitRecipe(e: FormEvent<HTMLFormElement>) {
		setLoading(true);
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		const fileToUpload = formData.get("coverURL");

		let coverURL = "";

		if (fileToUpload) {
			const uploadFormData = new FormData();
			uploadFormData.set("file", fileToUpload);

			const uploadResponse = await api.post("/upload", uploadFormData);

			coverURL = uploadResponse.data.fileUrl;
		}

		let title = formData.get("title") as string;
		let instructions = formData.get("instructions") as string;
		let ingredients = formData.get("ingredients") as string;
		let category = formData.get("category") as string;
		let tags = formData.get("category") as string;

		console.log(title, instructions, ingredients, category, tags, coverURL);

		try {
			await api.post(
				"/recipe",
				{
					coverURL: coverURL,
					title: title,
					instructions: instructions,
					ingredients: ingredients,
					categoryId: category,
					tags: tags,
					userId: id,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setLoading(false);
			window.alert("Receita cadastrada");
		} catch (err) {
			window.alert("Erro ao cadastrar" + err);
		}
	}

	return (
		<form
			onSubmit={handleSubmitRecipe}
			className="flex min-h-full w-full flex-col justify-center px-6 py-12 lg:px-8 mt-10 sm:mx-auto sm:w-full"
		>
			<div className="flex flex-row justify-center items-baseline gap-10">
				<div className="flex flex-col flex-1">
					<div>
						<label
							htmlFor="title"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Title of your recipe
						</label>
						<div className="mt-2">
							<input
								id="title"
								name="title"
								type="text"
								required
								className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
					<div className="mt-2">
						<label
							htmlFor="instructions"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Instructions for preparation
						</label>
						<div className="mt-2">
							<textarea
								id="instructions"
								name="instructions"
								typeof="text"
								required
								className="block w-full h-32 pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
					<div className="mt-2">
						<label
							htmlFor="ingredients"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Ingredients for your recipe
						</label>
						<div className="mt-2">
							<textarea
								id="ingredients"
								name="ingredients"
								required
								className="block w-full h-32 pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
				</div>
				<div className="flex flex-col flex-1">
					<div className="mt-2">
						<label
							htmlFor="category"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Select an category
						</label>
						<select
							id="category"
							name="category"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						>
							{categories.map((category, index) => (
								<option value={category.id} key={index} id="category">
									{category.name}
								</option>
							))}
						</select>
					</div>
					<FilePicker />
					<Button isLoading={loading} type="submit">
						Submit
					</Button>
				</div>
			</div>
		</form>
	);
}
