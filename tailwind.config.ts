
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
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// SkillKart custom colors
				purple: {
					DEFAULT: '#5D3FD3',
					light: '#7C4DFF',
					dark: '#4B32A8',
				},
				teal: {
					DEFAULT: '#20B2AA',
					light: '#3CCEC5',
					dark: '#198F89',
				},
				amber: {
					DEFAULT: '#FFBF00',
					light: '#FFD54F',
					dark: '#FFA000',
				},
				navy: {
					DEFAULT: '#1A1B25',
					light: '#262838',
					dark: '#12131C',
				},
				slate: {
					50: '#F8F9FA',
					100: '#F1F3F5',
					200: '#E9ECEF',
					300: '#DEE2E6',
					400: '#CED4DA',
					500: '#ADB5BD',
					600: '#6C757D',
					700: '#495057',
					800: '#343A40',
					900: '#212529',
				},
				// New colors for badges and gamification
				bronze: '#CD7F32',
				silver: '#C0C0C0',
				gold: '#FFD700',
				emerald: {
					500: '#10B981',
					600: '#059669',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'fade-out': {
					'0%': { opacity: '1' },
					'100%': { opacity: '0' }
				},
				'slide-in': {
					'0%': { transform: 'translateY(10px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'slide-out': {
					'0%': { transform: 'translateY(0)', opacity: '1' },
					'100%': { transform: 'translateY(10px)', opacity: '0' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'spin-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'pulse-subtle': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.7' }
				},
				// New animations for gamification
				'confetti-drop': {
					'0%': { transform: 'translateY(-10px)', opacity: '0' },
					'50%': { transform: 'translateY(0)', opacity: '1' },
					'90%': { transform: 'translateY(5px)', opacity: '1' },
					'100%': { transform: 'translateY(10px)', opacity: '0' }
				},
				'badge-pop': {
					'0%': { transform: 'scale(0)', opacity: '0' },
					'70%': { transform: 'scale(1.1)', opacity: '1' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'float-up': {
					'0%': { transform: 'translateY(0)', opacity: '1' },
					'100%': { transform: 'translateY(-20px)', opacity: '0' }
				},
				'glow-pulse': {
					'0%, 100%': { boxShadow: '0 0 5px rgba(93, 63, 211, 0.4)' },
					'50%': { boxShadow: '0 0 20px rgba(93, 63, 211, 0.8)' }
				},
				'draw-check': {
					'0%': { 'stroke-dashoffset': '60' },
					'100%': { 'stroke-dashoffset': '0' }
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-out': 'fade-out 0.3s ease-out',
				'slide-in': 'slide-in 0.3s ease-out',
				'slide-out': 'slide-out 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out',
				'spin-slow': 'spin-slow 6s linear infinite',
				'pulse-subtle': 'pulse-subtle 2s ease-in-out infinite',
				// New animations for gamification
				'confetti-drop': 'confetti-drop 1.5s forwards',
				'badge-pop': 'badge-pop 0.5s ease-out forwards',
				'float-up': 'float-up 1s ease-out forwards',
				'glow-pulse': 'glow-pulse 2s infinite',
				'draw-check': 'draw-check 0.5s ease forwards',
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				display: ['Poppins', 'sans-serif'],
			},
			backgroundImage: {
				'gradient-primary': 'linear-gradient(135deg, #5D3FD3, #20B2AA)',
				'gradient-primary-hover': 'linear-gradient(135deg, #4B32A8, #198F89)',
				'gradient-dark': 'linear-gradient(135deg, #1A1B25, #262838)',
				// New gradients for badges
				'gradient-bronze': 'linear-gradient(135deg, #CD7F32, #E9BE7D)',
				'gradient-silver': 'linear-gradient(135deg, #C0C0C0, #E8E8E8)',
				'gradient-gold': 'linear-gradient(135deg, #FFD700, #FFC107)',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
