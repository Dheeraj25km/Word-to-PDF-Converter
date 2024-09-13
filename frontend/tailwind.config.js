// /** @type {import('tailwindcss').Config} */

// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Add this line to include all relevant files
    './public/index.html' // Include your index.html file as well
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

