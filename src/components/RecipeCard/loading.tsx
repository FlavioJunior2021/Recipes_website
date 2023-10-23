export function LoadingRecipeCard(){
	return(
		<div className="w-[400] h-[430] flex flex-col justify-between gap-3 bg-zinc-100 hover:bg-zinc-300 p-2 rounded-md">
			<span className="loading loading-spinner loading-lg"></span>
			<div>
				<h3 className="text-2xl font-semibold text-body"><span className="loading loading-dots loading-sm"></span></h3>
				<span className="text-base text-span leading-7"><span className="loading loading-dots loading-sm"></span></span>
			</div>
		</div>
	)
}