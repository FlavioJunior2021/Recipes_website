/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { api } from "@/lib/api";
import { Recipe } from "@/types/recipe";
import { useState, useEffect } from "react";

export default function Recipes() {
	const [recipes, setRecipes] = useState<Recipe[]>([]);

	const getAllRecipes = async () => {
		try {
			const res = await api.get("/recipes");
			const data = res.data as Recipe[];
			setRecipes(data);
			console.log(data);
		} catch (error) {
			console.error("Failed to fetch recipes", error);
		}
	};

	useEffect(() => {
		getAllRecipes();
	}, []);

	return (
		<div className="bg-white">
			<div className="mx-auto max-w-2xl px-4 sm:px-6 sm:py-2 lg:max-w-7xl lg:px-8">
				<a
					href="/recipes/add"
					className="text-2xl font-bold tracking-tight text-body hover:text-zinc-700"
				>
					Create a recipe
				</a>
				<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
					{recipes.map((recipe) => (
						<a
							key={recipe.id}
							className="group relative"
							href={`/recipes/${recipe.id}`}
						>
							<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
								<img
									src={recipe.coverURL}
									className="h-full w-full object-cover object-center lg:h-full lg:w-full"
								/>
							</div>
							<div className="mt-4 flex justify-between">
								<p className="text-sm font-medium text-body">{recipe.title}</p>
							</div>
						</a>
					))}
				</div>
			</div>
		</div>
	);
}
