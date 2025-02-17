import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        blue: '#2A5FFF',
        lightblue: '#5E85FF',
        lighterblue: '#AFC3FF',
        darkgray: '#333333',
        lightgray: '#666666',
        darkblue: '#1C3FAA',
        red: '#E63946',
        lightred: '#FDEDED',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Arial', 'sans-serif'],
        montserrat: 'var(--font-montserrat)',
      },
    },
  },
  plugins: [],
} satisfies Config;
