
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: "1rem",
				sm: "2rem",
				lg: "4rem",
				xl: "5rem",
				"2xl": "6rem",
			},
			screens: {
				"2xl": "1400px"
			}
		},
		extend: {
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))"
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))"
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))"
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))"
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))"
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))"
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))"
				},
				sidebar: {
					DEFAULT: "hsl(var(--sidebar-background))",
					foreground: "hsl(var(--sidebar-foreground))",
					primary: "hsl(var(--sidebar-primary))",
					'primary-foreground': "hsl(var(--sidebar-primary-foreground))",
					accent: "hsl(var(--sidebar-accent))",
					'accent-foreground': "hsl(var(--sidebar-accent-foreground))",
					border: "hsl(var(--sidebar-border))",
					ring: "hsl(var(--sidebar-ring))"
				},
				tech: {
					DEFAULT: "#9b87f5",
					50: "#F5F3FF",
					100: "#E5DEFF",
					200: "#d6bcfa",
					300: "#b197fc",
					400: "#9b87f5",
					500: "#7E69AB",
					600: "#6E59A5",
					700: "#403E43",
					800: "#221F26",
					900: "#1A1F2C",
				}
			},
			fontFamily: {
				sans: ["Inter", "system-ui", "sans-serif"],
				mono: ["Roboto Mono", "monospace"],
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)"
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				"fade-in": {
					from: { opacity: "0" },
					to: { opacity: "1" },
				},
				"fade-out": {
					from: { opacity: "1" },
					to: { opacity: "0" },
				},
				"slide-up": {
					from: { transform: "translateY(20px)", opacity: "0" },
					to: { transform: "translateY(0)", opacity: "1" },
				},
				"slide-down": {
					from: { transform: "translateY(-20px)", opacity: "0" },
					to: { transform: "translateY(0)", opacity: "1" },
				},
				"text-reveal": {
					from: { transform: "translateY(100%)", opacity: "0" },
					to: { transform: "translateY(0)", opacity: "1" },
				},
				"pulse-slow": {
					"0%, 100%": { opacity: "1" },
					"50%": { opacity: "0.7" },
				},
				"rotate-center": {
					from: { transform: "rotate(0deg)" },
					to: { transform: "rotate(360deg)" },
				}
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"fade-in": "fade-in 0.5s ease-out",
				"fade-out": "fade-out 0.5s ease-out",
				"slide-up": "slide-up 0.5s ease-out",
				"slide-down": "slide-down 0.5s ease-out",
				"text-reveal": "text-reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
				"pulse-slow": "pulse-slow 3s ease-in-out infinite",
				"rotate-center": "rotate-center 8s linear infinite",
			},
			transitionDuration: {
				'400': '400ms',
				'2000': '2000ms',
			},
			transitionTimingFunction: {
				'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
				'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
