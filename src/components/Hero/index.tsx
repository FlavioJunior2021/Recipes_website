/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import heroimage from "../../assets/heroimage.png";

export function Hero() {
	return (
		<div className="min-h-screen w-full flex flex-row justify-center pt-5">
			<div className="bg-hero w-[680px] h-[640px] flex justify-center flex-col p-12 rounded-md">
				<h1 className="text-body text-6xl font-semibold mb-6">
					Spicy delicious<br/>chicken wings
				</h1>
				<span className="text-base text-span leading-7">
					Spicy and delicious chicken wings: The perfect blend of crispy and spicy that makes your mouth water.
				</span>
				<a href="/login" className="mt-10 text-span hover:text-blue-400">Log in to post your recipes</a>
			</div>
			<div>
				<Image src={heroimage} alt="hero" className="rounded-md"/>
			</div>
		</div>
	);
}

