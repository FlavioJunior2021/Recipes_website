import { CategoryCard } from "@/components/CategoryCard";
import { Hero } from "@/components/Hero";

const categories = [
  { icon: '🌱', name: 'Vegan' },
  { icon: '🥩', name: 'Meat' },
  { icon: '🍣', name: 'Seafood' },
  { icon: '🥗', name: 'Salad' },
  { icon: '🍔', name: 'Burgers' },
  { icon: '🍕', name: 'Pizza' }
];


export default function Home() {
	return (
		<div className="flex flex-col justify-center">
			<Hero />
			<div className="flex items-center justify-between w-full bg-base-100">
				<div className="pl-12">
					<a className="normal-case text-5xl font-semibold text-body">Categories</a>
				</div>
				<div className="pr-12">
					<a href="/recipes" className="text-span hover:text-blue-400">View all recipes</a>
				</div>
			</div>
			<div className="pt-20 pl-12 flex flex-row justify-around">
				{categories.map((category, index) => (
					<CategoryCard key={index} icon={category.icon} name={category.name} />
				))}
			</div>
		</div>
	);
}

