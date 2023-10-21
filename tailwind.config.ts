import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "background-color": "#FFFFFF",
				"body": "#000",
				"span": "#00000099",
				"hero": "#E7FAFE",
				"grad-1": "#70820",
      },
    },
  },
  plugins: [require("daisyui")],
}
export default config
