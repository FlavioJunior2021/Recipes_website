/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/Button";
import { api } from "@/lib/api";
import { GetUser } from "@/lib/auth";
import { Recipe } from "@/types/recipe";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type getRecipeByIdProps = {
	params: Recipe;
};

export default function RecipeId({ params }: getRecipeByIdProps) {
	const [recipe, setRecipe] = useState<Recipe[]>([]);
	const [user, setUser] = useState(GetUser());
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const { admin } = user;

	async function getRecipeById() {
		try {
			const response = await api.get(`/recipe/${params.id}`);
			const data = response.data;
			setRecipe(data);
		} catch (err) {
			window.alert(err);
		}
	}

	async function handleDeleteRecipe(recipeId: string) {
		try {
			const token = localStorage.getItem("token") as string
			await api.delete(`/recipe/${recipeId}`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			window.alert("Recipe deleted successfully")
			setRecipe(recipe.filter(recipe => recipe.id !== recipeId))
		} catch (err) {
			window.alert(err)
		}
	}

	useEffect(() => {
		getRecipeById();
		setUser(GetUser());
	}, [params.id]);

	return (
		<form
			className="flex w-full h-screen content-center pt-2"
		>
			<div className="pl-5 pb-2">
				{recipe.map((recipe, index) => (
					<div key={index} className="">
						<figure>
							<img
								src={recipe.coverURL}
								alt="recipe"
								className="w-[500px] grid h-[500px] flex-grow card rounded-box place-items-center"
							/>
						</figure>
					</div>
				))}
			</div>
			<div className="divider divider-horizontal"></div>
			<div className="grid h-full flex-grow card rounded-box place-items-start">
				{recipe.map((recipe, index) => (
					<div key={index} className="flex flex-col gap-10">
						<h2 className="text-2xl font-semibold text-body">{recipe.title}</h2>
						<div>
							<h4 className="text-lg font-semibold text-body text-justify">
								Ingredients
							</h4>
							<p>{recipe.ingredients}</p>
						</div>
						<div className="flex flex-col w-96 h-full pb-2">
							<h4 className="text-lg font-semibold text-body">Instructions</h4>
							<p>{recipe.instructions}</p>
						</div>
					</div>
				))}
				{recipe.map((recipe, index) => (
					admin &&
					<button key={index} className="btn-error p-2 rounded-md" onClick={() => handleDeleteRecipe(recipe.id)}>
						Delete
					</button>
				))}
			</div>
		</form>
	);
}
