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

	async function handleDeletRecipe(e: FormEvent<HTMLFormElement>) {
		setLoading(true);
		e.preventDefault();
		try {
			const token = localStorage.getItem("token") as string;
			await api.delete(`/recipe/${params.id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setLoading(false);
			router.push("/recipes");
			window.alert("Recipe Deleted");
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
			onSubmit={handleDeletRecipe}
		>
			<div className="grid h-full flex-grow card rounded-box place-items-center">
				{recipe.map((recipe, index) => (
					<div key={index}>
						<figure>
							<img
								src={recipe.coverURL}
								alt="recipe"
								className="w-96 h-96 rounded-md"
							/>
						</figure>
					</div>
				))}
			</div>
			<div className="divider divider-horizontal"></div>
			<div className="grid h-full flex-grow card rounded-box place-items-start">
				{recipe.map((recipe, index) => (
					<div key={index} className="flex flex-col gap-10">
						<h2 className="">{recipe.title}</h2>
						<p>{recipe.ingredients}</p>
						<p>{recipe.instructions}</p>
					</div>
				))}
				{admin && (
					<Button isLoading={loading} type="submit">
						Delete
					</Button>
				)}
			</div>
		</form>
	);
}
