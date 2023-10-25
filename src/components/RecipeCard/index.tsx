/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { Recipe } from "@/types/recipe"
import { LoadingRecipeCard } from "./loading";

type RecipeCardProps = {
	recipe: Recipe
	isLoading: boolean
}

export function RecipeCard({recipe, isLoading}: RecipeCardProps){
	if(isLoading){
		return(
			<LoadingRecipeCard />
		)
	}
	return(
		<a href={`/recipes/${recipe.id}`} className="w-[360px] h-[390px] flex flex-col gap-3 bg-zinc-100 hover:bg-zinc-200 p-2 rounded-md">
			<img 
				src={recipe.coverURL}
				alt="food image"
				width={360}
				height={390}
				className="rounded-md"
			/>
			<div>
				<h3 className="text-2xl font-semibold text-body">{recipe.title}</h3>
			</div>
		</a>
	)
}
