/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        'xs': '450px',
        'xss': '370px',
      },
      animation: {
        pingSlow: 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite', // Custom ping animation with 2s duration
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
}

