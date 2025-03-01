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
        pingSlow: 'ping 3.5s cubic-bezier(0, 0, 0.2, 1) infinite', // Custom ping animation with 2s duration
        bounce: 'bounce 10s infinite', // Custom bounce animation with 1s duration
      },
    },
  },
}

