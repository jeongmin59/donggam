/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    "./src/**/*.{js,ts,jsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'gradient-1': 'linear-gradient(180deg, rgba(121, 187, 254, 0.70) 0%, rgba(255, 255, 255, 0.70) 17.6%, rgba(255, 200, 183, 0.70) 52.9%, rgba(162, 208, 255, 0.70) 83.23%)',
        'gradient-2': 'linear-gradient(180deg, rgba(102, 177, 255, 0.70) 3.3%, rgba(255, 255, 255, 0.70) 17.02%, rgba(188, 220, 254, 0.70) 53.12%, rgba(102, 177, 255, 0.70) 100%)',
        'gradient-3': 'linear-gradient(180deg, rgba(129, 155, 181, 0.70) 3.3%, rgba(255, 255, 255, 0.70) 18.65%, rgba(169, 189, 209, 0.70) 53.02%)',
      },

      backgroundColor:{
        'mainColor' : 'var(--mainColor)',
        'subColor' : 'var(--subColor)',
      }

    },
  },
  plugins: [],
}