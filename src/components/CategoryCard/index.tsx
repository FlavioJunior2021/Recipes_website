type CategoryCardProps = {
	icon: string
	name: string
}

export function CategoryCard({icon, name}: CategoryCardProps){
	return(
		<button className="w-40 h-20 flex flex-col justify-center items-center gap-4 bg-blue-200 rounded-md">
			<div>
				<h1 className="text-9xl">
					{icon}
				</h1>
			</div>
			<h3 className="text-lg font-semibold">
				{name}
			</h3>
		</button>
	)
}