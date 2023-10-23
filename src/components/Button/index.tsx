/* eslint-disable @next/next/no-img-element */
type ButtonProps = {
	children: React.ReactNode
	isLoading: boolean
	type: "button" | "submit" | "reset" | undefined
}

export function Button({ children, isLoading, type }: ButtonProps){
	return(
		<div className="w-full">
			<button type={type} disabled={isLoading} className={`text-span gap-4 justify-center w-full bg-blue-400 hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-white px-5 py-2.5 text-center inline-flex items-center ${isLoading ? 'btn-disabled	' : ''}`}>
				{children}
				{isLoading && <span className="loading loading-spinner loading-xs"></span>}
			</button>
		</div>
	)
}
