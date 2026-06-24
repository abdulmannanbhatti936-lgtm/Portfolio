/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    // Skill card icon colors (dynamic class names in SkillCard)
    'text-orange-500',
    'text-blue-500',
    'text-yellow-400',
    'text-blue-400',
    'text-sky-400',
    'text-indigo-500',
    'text-blue-600',
    'text-green-500',
    'text-purple-600',
    'text-orange-600',
    'text-neutral-800',
    'text-sky-500',
    'text-green-600',
    'text-purple-500',
  ],
  theme: {
    extend: {
      colors: {
        background: '#f0f0f0',
        sidebar: '#1e2a3a',
        primary: '#1e2a3a', // Same as sidebar for monochrome feel
        heading: '#111111',
        body: '#444444',
        subtle: '#888888',
        card: '#ffffff',
        border: '#e5e5e5',
      },
      dark: {
        background: '#0a0a0a',
        sidebar: '#1a1a1a',
        primary: '#ffffff',
        heading: '#ffffff',
        body: '#d1d5db',
        subtle: '#9ca3af',
        card: '#1a1a1a',
        border: '#374151',
      },
      fontFamily: {
        space: ['var(--font-space)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.4em',
      },
      boxShadow: {
        'minimal': '0 4px 20px -10px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}