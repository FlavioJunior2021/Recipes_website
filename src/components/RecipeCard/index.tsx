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
		<a href={`/recipe/${recipe.id}`} className="w-[400] h-[430] flex flex-col gap-3 bg-zinc-100 hover:bg-zinc-200 p-2 rounded-md">
			<Image 
				src={recipe.coverURL}
				alt="food image"
				width={260}
				height={260}
				className="rounded-md"
			/>
			<div>
				<h3 className="text-2xl font-semibold text-body">{recipe.title}</h3>
				<span className="text-base text-span leading-7">{recipe.tags}</span>
			</div>
		</a>
	)
}