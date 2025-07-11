/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        'header': '4.5rem', // 72px, matches header height
        'hero': '6.5rem',  // 104px, for hero top padding
      },
    },
  },
  plugins: [],
};
