/* eslint-disable react-hooks/exhaustive-deps */
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

	const { admin, id } = user;

	async function getRecipeById() {
		try {
			const response = await api.get(`/recipe/${params.id}`);
			const data = response.data;
			setRecipe(data);
		} catch (err) {
			window.alert(err);
		}
	}

	console.log(recipe, "user id:", id);

	async function handleDeleteRecipe(recipeId: string) {
		try {
			const token = localStorage.getItem("token") as string;
			await api.delete(`/recipe/${recipeId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			window.alert("Recipe deleted successfully");
			router.push("/recipes");
		} catch (err) {
			window.alert(err);
		}
	}

	async function handleAtualizeRecipe(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		// Aqui você pode obter os valores atualizados dos inputs.
		// Certifique-se de ter um estado separado para cada input (título, ingredientes, instruções)
		const updatedTitle = formData.get("title");
		const updatedIngredients = formData.get("ingredients");
		const updatedInstructions = formData.get("instructions");

		try {
			const token = localStorage.getItem("token") as string;
			await api.put(
				`/recipe/${params.id}`,
				{
					title: updatedTitle,
					ingredients: updatedIngredients,
					instructions: updatedInstructions,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			window.alert("Recipe updated successfully");
			router.push("/recipes");
		} catch (err) {
			window.alert(err);
		}
	}

	useEffect(() => {
		getRecipeById();
		setUser(GetUser);
	}, [params.id]);

	return (
		<form
			className="flex w-full h-screen content-center pt-2"
			onSubmit={handleAtualizeRecipe}
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
						{recipe.userId == id ? (
							<input
								type="text"
								name="title"
								className="text-2xl font-semibold text-body border p-1 rounded-md"
								defaultValue={recipe.title}
								required
							/>
						) : (
							<h2 className="text-2xl font-semibold text-body">
								{recipe.title}
							</h2>
						)}
						<div className="flex flex-col w-96 h-full pb-2 justify-center">
							<h4 className="text-lg font-semibold text-body text-justify">
								Ingredients
							</h4>
							{recipe.userId == id ? (
								<textarea
									className="text-base  font-semibold text-body border p-1 rounded-md"
									defaultValue={recipe.ingredients}
									name="ingredients"
									required
								/>
							) : (
								<p>{recipe.ingredients}</p>
							)}
						</div>
						<div className="flex flex-col w-96 h-full pb-2 justify-center">
							<h4 className="text-lg font-semibold text-body">Instructions</h4>
							{recipe.userId == id ? (
								<textarea
									className="text-base font-semibold text-body border p-1 rounded-md"
									defaultValue={recipe.instructions}
									name="instructions"
									required
								/>
							) : (
								<p>{recipe.instructions}</p>
							)}
						</div>
					</div>
				))}
				<div className="flex flex-row gap-2">
					{recipe.map(
						(recipe, index) =>
							admin && (
								<button
									key={index}
									className="btn-error p-2 rounded-md"
									onClick={() => handleDeleteRecipe(recipe.id)}
								>
									Delete
								</button>
							)
					)}
					{recipe.map((recipe, index) =>
						recipe.userId == id ? (
							<button
								key={index}
								type="submit"
								className="btn-warning p-2 rounded-md"
							>
								Atualize
							</button>
						) : (
							<></>
						)
					)}
				</div>
			</div>
		</form>
	);
}
