import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        space: '#0a0a0f',
        electric: '#54d2ff',
        nebula: '#8b5cf6',
        aurora: '#22d3ee',
      },
      boxShadow: {
        glow: '0 0 40px rgba(84, 210, 255, 0.18)',
      },
      backgroundImage: {
        cosmic: 'radial-gradient(circle at top, rgba(84,210,255,0.18), transparent 35%), radial-gradient(circle at 20% 20%, rgba(139,92,246,0.22), transparent 30%), radial-gradient(circle at 80% 0%, rgba(34,211,238,0.18), transparent 25%)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        drift: 'drift 8s ease-in-out infinite',
        twinkle: 'twinkle 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
