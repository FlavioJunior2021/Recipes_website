/* eslint-disable react/jsx-key */
"use client";

import { CategoryCard } from "@/components/CategoryCard";
import { Hero } from "@/components/Hero";
import { api } from "@/lib/api";
import React from "react";
import { useState, useEffect } from "react";
import { Recipe } from "@/types/recipe";
import { RecipeCard } from "@/components/RecipeCard";

const categories = [
	{ icon: "🌱", name: "Vegan", id: "fcce4fb2-5368-4a39-9dbd-9d3951f58e71" },
	{ icon: "🥩", name: "Meat", id: "aa2b0152-3362-40b0-861a-58576e8b67ef" },
	{ icon: "🍣", name: "Seafood", id: "a5d767e0-3a69-4fb8-92ae-b7ef39c2589c" },
	{ icon: "🥗", name: "Salad", id: "6222a6ae-e4a1-44e7-b53e-81d636943bf1" },
	{ icon: "🍔", name: "Burgers", id: "e65a385c-7cc5-4e4e-9343-5d1908eb3b0f" },
];

async function getRecipesByCategorie(id: string): Promise<Recipe[]> {
	const res = await api.get(`/category/${id}/recipes`);
	return res.data;
}

async function getAllRecipes() {
	const res = await api.get("/recipes");
	const data = res.data as Recipe[];
	return data;
}

const MemoizedCategoryCard = React.memo(CategoryCard);

export default function Home() {
	const [data, setData] = useState<Recipe[]>([]);
	const [category, setCategory] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (category) {
			setLoading(true);
			getRecipesByCategorie(category)
				.then((data) => {
					setData(data);
					setLoading(false);
				})
				.catch((error) => {
					setLoading(false);
				});
		} else {
			setLoading(true);
			getAllRecipes()
				.then((data) => {
					setData(data);
					setLoading(false);
				})
				.catch((error) => {
					setLoading(false);
				});
		}
	}, [category]);

	console.log(data);

	return (
		<div className="flex flex-col justify-center">
			<Hero />
			<div className="flex items-center justify-between w-full bg-base-100">
				<div className="pl-12">
					<a className="normal-case text-5xl font-semibold text-body">
						Categories
					</a>
				</div>
				<div className="pr-12">
					<a href="/recipes" className="text-span hover:text-blue-400">
						View all recipes
					</a>
				</div>
			</div>
			<div className="pt-20 pl-12 flex flex-row justify-around">
				{categories.map((category, index) => (
					<MemoizedCategoryCard
						key={index}
						icon={category.icon}
						name={category.name}
						onClickButton={() => setCategory(category.id)}
					/>
				))}
			</div>
			<div className="flex flex-row flex-wrap justify-around pt-20 pb-5">
				{data.map((recipe, index) => (
					<RecipeCard key={index} recipe={recipe} isLoading={loading} />
				))}
			</div>
		</div>
	);
}
