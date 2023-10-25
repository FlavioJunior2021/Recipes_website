"use client"

import { api } from "@/lib/api";
import { GetUser } from "@/lib/auth";
import { Recipe } from "@/types/recipe";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Recipes() {
	const router = useRouter()
	const { sub } = GetUser();

	if (!sub) {
		router.push("/");
	}

	const [recipes, setRecipes] = useState<Recipe[]>([])

	useEffect(() => {
		async function getRecipes() {
			try {
				const token = localStorage.getItem("token") as string
				const res = await api.get("/recipes", {
					headers: {
						Authorization: `Bearer ${token}`
					}
				})
				setRecipes(res.data)
			} catch (err) {
				window.alert(err)
			}
		}

		getRecipes()
	}, [])

	async function handleDeleteRecipe(recipeId: string) {
		try {
			const token = localStorage.getItem("token") as string
			await api.delete(`/recipe/${recipeId}`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			setRecipes(recipes.filter(recipe => recipe.id !== recipeId))
		} catch (err) {
			window.alert(err)
		}
	}

	return (
		<div className="overflow-x-auto">
			<table className="table table-zebra">
				{/* head */}
				<thead>
					<tr>
						<th>Id</th>
						<th>Title</th>
						<th>Ingredients</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{recipes.map((recipe, index) => (
						<tr key={index}>
							<th>{recipe.id}</th>
							<td>{recipe.title}</td>
							<td>{recipe.ingredients.split(',')}</td>
							<td><button type="button" onClick={() => handleDeleteRecipe(recipe.id)} className="btn-md bg-transparent text-red-600 hover:text-red-700">Delete</button></td>
						</tr>
					))}
				</tbody>

			</table>
		</div>
	)
}