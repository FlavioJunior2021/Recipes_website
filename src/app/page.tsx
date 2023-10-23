/* eslint-disable react/jsx-key */
"use client";

import { CategoryCard } from "@/components/CategoryCard";
import { Hero } from "@/components/Hero";
import { api } from "@/lib/api";
import React from "react";
import { useState, useEffect } from "react";
import { Recipe } from "@/types/recipe";
import { RecipeCard } from "@/components/RecipeCard";
import { Footer } from "@/components/Footer";

const categories = [
	{ icon: "🌱", name: "Vegan", id: "4c164c6a-dad3-4249-a617-10d7292bc24a" },
	{ icon: "🥩", name: "Meat", id: "81232146-4211-436f-8fed-63b95854878c" },
	{ icon: "🍣", name: "Seafood", id: "8254821e-c67b-4277-bd08-bafbb5f55ae2" },
	{ icon: "🥗", name: "Salad", id: "89ec1a1c-801f-482e-b754-7a4d04f24ce5" },
	{ icon: "🍔", name: "Burgers", id: "955d6928-0955-4277-aa4e-85a4d56daf77" },
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
			<Footer />
		</div>
	);
}
