type CategoryCardProps = {
	icon: string
	name: string
	onClickButton: () => void
}

export function CategoryCard({icon, name, onClickButton}: CategoryCardProps){
	return(
		<button className="w-40 h-20 flex flex-col justify-center items-center gap-4 bg-blue-200 rounded-full" onClick={onClickButton}>
			<div>
				<h1 className="text-4xl">
					{icon}
				</h1>
			</div>
			<h3 className="text-md font-semibold text-white">
				{name}
			</h3>
		</button>
	)
}