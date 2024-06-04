/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      titulo:["Rowdies", "sans-serif"] ,
      texto: ["Roboto", "sans-serif"],
    },
    extend: {
      colors: {
        "customPink": "#EA556C"
      },
      backgroundImage: {
        'custom-radial': 'radial-gradient(circle, #1E2635 0%, #03a6d326 100%)',
        'custom-icon': 'linear-gradient(135deg, #7FFFD4, #1E90FF)',
        'custom-card': 'linear-gradient(135deg, #000000, #00376d)' 
      },
      boxShadow: {
        'custom-card': '2px 3px 2px 0px #008a9b1c',
        'custom-grafico': '2px 3px 2px 0px #ffffff17'
      },
      container: {
        center: true,
      },
      maxWidth: {
        custom: '1200px'
      },
      minHeight: {
        minDashboard: "calc(100vh - 64px)"
      },
      screens: {
        mobile: '450px'
      }
    },
  },
  plugins: [],
}
