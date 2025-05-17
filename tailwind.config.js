module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        neon: {
          blue: '#00f0ff',
          magenta: '#ff00ea',
          green: '#39ff14',
        },
      },
      boxShadow: {
        neon: '0 0 32px #00f0ff, 0 0 8px #ff00ea inset',
      }
    },
  },
  plugins: [],
} 