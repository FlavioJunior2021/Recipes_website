/* eslint-disable @next/next/no-img-element */
type ButtonProps = {
	children: React.ReactNode
	isLoading: boolean
}

export function Button({ children, isLoading }: ButtonProps){
	return(
		<div className="navbar-end">
			<button type="button" disabled={isLoading} className="text-span gap-4 bg-blue-400 hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
				{children}
				{isLoading && <span className="loading loading-spinner loading-xs"></span>}
			</button>
		</div>
	)
}
