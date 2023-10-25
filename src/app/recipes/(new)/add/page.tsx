"use client";

import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { api } from "@/lib/api";

const categories = [
	{ icon: "🌱", name: "Vegan", id: "fcce4fb2-5368-4a39-9dbd-9d3951f58e71" },
	{ icon: "🥩", name: "Meat", id: "aa2b0152-3362-40b0-861a-58576e8b67ef" },
	{ icon: "🍣", name: "Seafood", id: "a5d767e0-3a69-4fb8-92ae-b7ef39c2589c" },
	{ icon: "🥗", name: "Salad", id: "6222a6ae-e4a1-44e7-b53e-81d636943bf1" },
	{ icon: "🍔", name: "Burgers", id: "e65a385c-7cc5-4e4e-9343-5d1908eb3b0f" },
];

export default function New() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [previewImage, setPreviewImage] = useState();
	const token = localStorage.getItem("token") as string;

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

		await api.post(
			"/recipe",
			{
				coverURL: coverURL,
				title: title,
				instructions: instructions,
				ingredients: ingredients,
				categoryId: category,
				tags: tags,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		setLoading(false);
		window.alert("Receita cadastrada");
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
					<div className="flex items-center justify-center w-full mt-2 mb-2">
						<label
							htmlFor="dropzone-file"
							className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
						>
							<div className="flex flex-col items-center justify-center pt-5 pb-6">
								<svg
									className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 20 16"
								>
									<path
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
									/>
								</svg>
								<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
									<span className="font-semibold">Click to upload</span> or drag
									and drop
								</p>
								<p className="text-xs text-gray-500 dark:text-gray-400">
									SVG, PNG or JPG (MAX. 800x400px)
								</p>
							</div>
							<input
								id="dropzone-file"
								type="file"
								className="hidden"
								name="coverURL"
							/>
						</label>
					</div>
					<Button isLoading={loading} type="submit">
						Submit
					</Button>
				</div>
			</div>
		</form>
	);
}
