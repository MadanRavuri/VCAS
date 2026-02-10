/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        navy: {
          DEFAULT: 'var(--navy)',
          light: 'var(--navy-light)',
        },
        muted: 'var(--muted)',
        foreground: 'var(--foreground)',
        card: 'var(--card)',
        'card-border': 'var(--card-border)',
      },
    },
  },
  plugins: [],
};
