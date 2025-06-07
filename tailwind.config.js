export default {
  content: ["./index.html", "./**/*.js"], // ✔ ensures Tailwind scans all your files for class usage
  theme: {
    extend: {
      keyframes: {
        'bounce-glow': {
          '0%, 100%': {
            transform: 'translateY(0)',
            color: 'rgba(107,114,128,0.6)', // gray-600 muted
          },
          '50%': {
            transform: 'translateY(-10px)',
            color: 'rgba(99,102,241,1)', // indigo-500
          },
        },
      },
      animation: {
        'bounce-glow': 'bounce-glow 2.5s ease-in-out infinite',
      },
      transitionProperty: {
        'transform-opacity': 'transform, opacity',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
